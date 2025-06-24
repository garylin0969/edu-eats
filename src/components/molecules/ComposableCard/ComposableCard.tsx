import { ReactNode } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
} from '@/components/ui/card';

interface ComposableCardProps {
    title?: string;
    description?: string;
    action?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    cardClassName?: string;
    cardHeaderClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    cardActionClassName?: string;
    cardContentClassName?: string;
    cardFooterClassName?: string;
}

// 可組合的卡片元件
const ComposableCard = ({
    title,
    description,
    action,
    content,
    footer,
    cardClassName,
    cardHeaderClassName,
    cardTitleClassName,
    cardDescriptionClassName,
    cardActionClassName,
    cardContentClassName,
    cardFooterClassName,
}: ComposableCardProps) => {
    return (
        <Card className={cardClassName}>
            <CardHeader className={cardHeaderClassName}>
                {title && <CardTitle className={cardTitleClassName}>{title}</CardTitle>}
                {description && <CardDescription className={cardDescriptionClassName}>{description}</CardDescription>}
                {action && <CardAction className={cardActionClassName}>{action}</CardAction>}
            </CardHeader>
            <CardContent className={cardContentClassName}>{content && content}</CardContent>
            {footer && <CardFooter className={cardFooterClassName}>{footer}</CardFooter>}
        </Card>
    );
};

export default ComposableCard;
