import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-[#BFA76A] text-black hover:bg-white hover:text-black shadow-md shadow-[#BFA76A]/10 font-bold',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
          'border border-[#BFA76A]/50 bg-transparent text-white hover:bg-[#BFA76A] hover:text-black transition-all',
				secondary:
          'bg-zinc-800 text-white hover:bg-zinc-700',
				ghost: 'hover:bg-[#BFA76A]/10 hover:text-[#BFA76A]',
				link: 'text-[#BFA76A] underline-offset-4 hover:underline',
        premium: 'bg-[#BFA76A] text-black hover:bg-white hover:text-black font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(191,167,106,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300',
        blue: 'bg-[#BFA76A] text-black hover:bg-white hover:text-black shadow-md shadow-[#BFA76A]/20' // Unified to gold as requested
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
        xl: 'h-14 px-8 text-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };