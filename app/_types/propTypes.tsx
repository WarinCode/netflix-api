import { JSX } from "react";

export interface RedButtonProps {
    className?: string;
    href: string;
    text: string;
}

export interface ActionButtonProps extends Omit<RedButtonProps, "href">{
    handleClick: () => void | Promise<void>;
}

export interface IconButtonProps extends ActionButtonProps {
    icon: JSX.Element;
}

export interface NetflixContainerProps {
    children: React.ReactNode;
    className?: string;
}

export interface CodeExampleProps {
    className?: string;
    imagePath: string;
    text: string;
    textElement?: JSX.Element;
    width: number;
    height: number;
    alt: string;
}