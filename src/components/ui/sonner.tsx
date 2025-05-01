import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-white/90 group-[.toaster]:to-white/80 group-[.toaster]:text-gradient group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gradient",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-cyan-500 group-[.toast]:to-purple-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
