"use client"
import * as React from "react";
import { MainContext } from "@/context/MainContext";

export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<MainContext>
			{children}
		</MainContext>
	);
}
