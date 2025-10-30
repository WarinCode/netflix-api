export interface RedButtonProps {
    className?: string;
    href: string;
    text: string;
}

export interface ActionButtonProps extends Omit<RedButtonProps, "href">{
    handleClick: () => void | Promise<void>;
}