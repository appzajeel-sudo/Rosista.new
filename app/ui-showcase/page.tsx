"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function UIShowcasePage() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const products = [
    {
      title: "Product 1",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 2",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 3",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 4",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 5",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 6",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 7",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 8",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 9",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 10",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 11",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 12",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 13",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 14",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
    {
      title: "Product 15",
      link: "#",
      thumbnail: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="container mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-10">UI Components Showcase</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input</h2>
        <div className="max-w-sm">
          <Input type="email" placeholder="Email" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Select</h2>
        <div className="max-w-sm">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sheet</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toast</h2>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Show Toast
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Carousel</h2>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="border rounded-md p-6 flex aspect-square items-center justify-center">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Aspect Ratio</h2>
        <div className="w-[450px]">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted rounded-md flex items-center justify-center"
          >
            16:9 Aspect Ratio
          </AspectRatio>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Resizable</h2>
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[200px]">Content for Item One</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skeleton</h2>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Components</h2>
        <div className="flex gap-4 items-center">
          <LanguageSwitcher />
          <FavoriteButton
            product={{
              id: "test-product",
              nameEn: "Test Product",
              nameAr: "منتج تجريبي",
              price: 100,
              image: "https://placehold.co/200x200",
            }}
          />
          <AddToCartButton
            product={{
              id: "test-product",
              nameEn: "Test Product",
              nameAr: "منتج تجريبي",
              price: 100,
              image: "https://placehold.co/200x200",
            }}
            isRtl={false}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Hero Parallax</h2>
        <div className="h-[500px] overflow-hidden border rounded-md relative">
          <HeroParallax products={products} />
        </div>
      </section>

      <Toaster />
    </div>
  );
}
