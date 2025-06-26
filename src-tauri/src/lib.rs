use serde::{Deserialize, Serialize};

// API 請求結構
#[derive(Serialize)]
struct ApiRequest {
    method: String,
    args: ApiArgs,
}

#[derive(Serialize)]
struct ApiArgs {
    #[serde(rename = "schoolId")]
    school_id: i64,
    #[serde(rename = "schoolCode")]
    school_code: String,
    #[serde(rename = "schoolName")]
    school_name: String,
}

// API 回應結構（根據實際 API 回應調整）
#[derive(Deserialize, Serialize)]
pub struct ApiResponse {
    pub result_content: ResultContent,
    pub resource: String,
    pub method: String,
    pub result: String,
    pub error_msg: String,
}

#[derive(Deserialize, Serialize)]
pub struct ResultContent {
    #[serde(rename = "resStatus")]
    pub res_status: i32,
    pub msg: String,
    #[serde(rename = "storeList")]
    pub store_list: Vec<Store>,
}

#[derive(Deserialize, Serialize)]
pub struct Store {
    #[serde(rename = "storeId")]
    pub store_id: String,
    #[serde(rename = "storeName")]
    pub store_name: String,
    #[serde(rename = "schoolId")]
    pub school_id: String,
    #[serde(rename = "schoolName")]
    pub school_name: String,
    #[serde(rename = "storeTypeCode")]
    pub store_type_code: String,
    #[serde(rename = "storeTypeName")]
    pub store_type_name: String,
    #[serde(rename = "storeParentCode")]
    pub store_parent_code: String,
    #[serde(rename = "storeParentName")]
    pub store_parent_name: String,
    #[serde(rename = "storeCode")]
    pub store_code: String,
    #[serde(rename = "sfStreetId")]
    pub sf_street_id: String,
    pub enable: String,
    pub logo: String,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn query_chain_store(
    school_id: i64,
    school_code: Option<String>,
    school_name: Option<String>,
) -> Result<ApiResponse, String> {
    let client = reqwest::Client::new();
    let url = "https://fatraceschool.k12ea.gov.tw/cateringservice/rest/API/";

    let request_body = ApiRequest {
        method: "QueryChainStore".to_string(),
        args: ApiArgs {
            school_id,
            school_code: school_code.unwrap_or_default(),
            school_name: school_name.unwrap_or_default(),
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
                    Ok(data) => Ok(data),
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
        .invoke_handler(tauri::generate_handler![greet, query_chain_store])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
