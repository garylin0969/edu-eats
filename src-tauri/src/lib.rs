use serde::{Deserialize, Serialize};
use serde_json::Value;

// API 請求結構
#[derive(Serialize)]
struct ApiRequest {
    method: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    username: Option<String>,
    args: ApiArgs,
}

#[derive(Serialize)]
struct ApiArgs {
    #[serde(rename = "schoolId")]
    school_id: i64,
    #[serde(rename = "schoolCode", skip_serializing_if = "String::is_empty")]
    school_code: String,
    #[serde(rename = "schoolName", skip_serializing_if = "String::is_empty")]
    school_name: String,
    #[serde(rename = "func", skip_serializing_if = "String::is_empty")]
    func: String,
    #[serde(rename = "storeId", skip_serializing_if = "String::is_empty")]
    store_id: String,
    #[serde(rename = "type", skip_serializing_if = "String::is_empty")]
    var_type: String,
    #[serde(rename = "valueName", skip_serializing_if = "String::is_empty")]
    value_name: String,
}

// API 回應結構（使用 Value 來處理動態欄位）
#[derive(Deserialize, Serialize)]
pub struct ApiResponse {
    pub result_content: Value,
    pub resource: String,
    pub method: String,
    pub result: String,
    pub error_msg: String,
}

// 自定義回應結構，類似 Express 的回應格式
#[derive(Deserialize, Serialize)]
pub struct CustomResponse {
    pub result: i32,
    pub message: String,
    pub data: Option<Value>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn query_catering_service(
    method: String,
    school_id: i64,
    school_code: Option<String>,
    school_name: Option<String>,
    func: Option<String>,
    store_id: Option<String>,
    var_type: Option<String>,
    value_name: Option<String>,
    token: Option<String>,
    username: Option<String>,
    key: Option<String>,
) -> Result<CustomResponse, String> {
    let client = reqwest::Client::new();
    let url = "https://fatraceschool.k12ea.gov.tw/cateringservice/rest/API/";

    let request_body = ApiRequest {
        method: method.clone(),
        token,
        username,
        args: ApiArgs {
            school_id,
            school_code: school_code.unwrap_or_default(),
            school_name: school_name.unwrap_or_default(),
            func: func.unwrap_or_default(),
            store_id: store_id.unwrap_or_default(),
            var_type: var_type.unwrap_or_default(),
            value_name: value_name.unwrap_or_default(),
        },
    };

    println!("Sending request to: {}", url);
    println!(
        "Request body: {}",
        serde_json::to_string(&request_body).unwrap_or_default()
    );

    match client.post(url).json(&request_body).send().await {
        Ok(response) => {
            let status = response.status();
            println!("Response status: {}", status);

            if status.is_success() {
                let response_text = response.text().await.unwrap_or_default();
                println!("Response text: {}", response_text);

                match serde_json::from_str::<ApiResponse>(&response_text) {
                    Ok(api_response) => {
                        // 提取 message
                        let message = api_response.result_content
                            .get("msg")
                            .and_then(|v| v.as_str())
                            .unwrap_or("Success")
                            .to_string();

                        // 根據 key 提取特定資料，如果沒有 key 則回傳整個 result_content
                        let data = if let Some(key_name) = key {
                            api_response.result_content.get(&key_name).cloned()
                        } else {
                            Some(api_response.result_content)
                        };

                        Ok(CustomResponse {
                            result: 1,
                            message,
                            data,
                        })
                    },
                    Err(e) => Err(format!(
                        "Failed to parse response: {} | Response: {}",
                        e, response_text
                    )),
                }
            } else {
                Err(format!(
                    "HTTP error: {} | Status: {}",
                    status,
                    status.canonical_reason().unwrap_or("Unknown")
                ))
            }
        }
        Err(e) => Err(format!("Request failed: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, query_catering_service])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
