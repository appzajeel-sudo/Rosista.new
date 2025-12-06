"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { ReactNode } from "react";

export interface DropdownMenuItem {
  label: string;
  value: string;
  icon?: ReactNode;
  shortcut?: string;
}

interface DropdownMenuProps {
  trigger: string | ReactNode;
  items: DropdownMenuItem[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  className?: string;
  align?: "start" | "end";
  isRtl?: boolean;
}

export function DropdownMenu({
  trigger,
  items,
  onSelect,
  selectedValue,
  className = "",
  align = "end",
  isRtl = false,
}: DropdownMenuProps) {
  return (
    <Menu>
      <MenuButton
        className={`inline-flex items-center gap-2 rounded-md bg-gray-100 dark:bg-black px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-200 dark:hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors ${className}`}
      >
        {typeof trigger === "string" ? (
          <>
            {trigger}
            <ChevronDownIcon className="h-4 w-4 opacity-60" />
          </>
        ) : (
          trigger
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor={`bottom ${align}`}
        modal={false}
        className={`w-52 origin-top-${
          align === "end" ? "right" : "left"
        } rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black p-1 text-sm shadow-lg transition duration-100 ease-out [--anchor-gap:4px] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        {items.map((item) => (
          <MenuItem key={item.value}>
            <button
              onClick={() => onSelect(item.value)}
              className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                isRtl ? "text-right" : "text-left"
              } ${
                selectedValue === item.value
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-900"
              }`}
            >
              {item.icon && (
                <span className="flex-shrink-0 opacity-60">{item.icon}</span>
              )}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <kbd className="hidden font-mono text-xs opacity-50 group-hover:inline">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
