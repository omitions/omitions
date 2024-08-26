import { Landmark, LucideProps, Text, icons } from "lucide-react";

function Icon({ name, ...props }: LucideProps & { name: keyof typeof icons }) {
  const LucideIcon = icons[name];
  return <LucideIcon {...props} />;
}

function BloumIcon({ size = 38 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 38 38"
    >
      <rect width={size} height={size} fill="#D1CCDC" rx="19"></rect>
      <path
        fill="#170152"
        fillRule="evenodd"
        d="M15.13 10.4c.823-1.814 3.627-3.9 7.824-2.126 4.198 1.772 3.486 6.386 2.933 6.964.19.053.42.106.676.165 1.883.434 5.224 1.204 5.1 5.006-.14 4.308-4.204 4.436-5.041 4.307-.162 2.46-1.455 5.922-5.602 5.671-3.35-.202-5.075-2.754-5.076-3.564-1.228 1.09-6.157 1.642-8.176-2.111-1.923-3.578.409-6.011 1.193-6.83l.023-.024c-1.96-1.662-4.656-5.615-.34-8.587 3.136-2.16 6.16.61 6.486 1.13zm.596 11.47c1.359.97 4.867.785 5.88-1.051.807-1.466.985-3.71-1.042-4.689-1.777-1.133-4.756-.487-5.585.726-.828 1.214-1.29 3.558.748 5.013z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function MybucksLogo({
  height = 42,
  color = "#404040",
}: {
  height?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="auto"
      height={height}
      fill="none"
      viewBox="0 0 129 52"
    >
      <path
        fill={color}
        d="M121.408 25.272c-4.182 0-6.766-2.55-7.65-5.134l4.012-1.564c.408 1.598 1.734 2.924 3.638 2.924 1.326 0 2.21-.646 2.21-1.598 0-2.686-9.078-.884-9.078-7.378 0-2.686 2.346-4.93 6.12-4.93 3.502 0 6.392 1.7 7.174 4.182l-4.012 1.666c-.442-1.564-1.836-2.278-2.992-2.278-1.122 0-1.904.476-1.904 1.224 0 2.72 9.214.476 9.214 7.412 0 2.958-2.72 5.474-6.732 5.474z"
      ></path>
      <path
        fill={color}
        d="M109.863 25l-4.658-7.072-1.87 1.87V25h-5.032V.928h5.032v12.546l5.712-5.61h6.256l-6.766 6.732L115.813 25h-5.95zM88.974 25.272c-5.168 0-8.772-3.638-8.772-8.84s3.604-8.84 8.772-8.84c4.59 0 7.786 2.312 8.33 6.086l-4.828.952c-.272-1.7-1.53-2.788-3.298-2.788-2.346 0-3.842 1.802-3.842 4.59s1.53 4.59 3.842 4.59c1.768 0 2.89-1.02 3.23-2.584l4.862.986c-.612 3.604-3.774 5.848-8.296 5.848zM79.196 7.864V25h-4.964v-2.278c-1.054 1.496-2.924 2.55-5.236 2.55-3.774 0-6.324-2.448-6.324-6.222V7.864h4.998v9.86c0 1.87 1.156 3.128 2.924 3.128 2.38 0 3.638-1.938 3.638-5.474V7.864h4.964zM53.614 25.272c-1.938 0-3.672-.748-4.556-1.972V25H44.06V.928h4.998v8.568c.952-1.156 2.584-1.904 4.624-1.904 4.964 0 8.024 3.468 8.024 8.84s-3.06 8.84-8.092 8.84zm-.816-4.25c2.414 0 4.012-1.836 4.012-4.59 0-2.754-1.598-4.59-4.012-4.59-2.448 0-4.046 1.836-4.046 4.59 0 2.754 1.598 4.59 4.046 4.59zM38.858 7.864h5.1l-9.044 23.324h-5.1l2.72-7.038-6.596-16.286h5.406l3.672 9.928 3.842-9.928zM0 25V1.2h5.916l6.902 16.184L19.72 1.2h5.916V25h-4.998V11.162L14.79 25h-3.91L4.998 11.162V25H0z"
      ></path>
      <path fill="#2DD666" d="M44 41H128V52H44z"></path>
    </svg>
  );
}

function WalletIcon() {
  return (
    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-orange-400/60 bg-gradient-to-b from-orange-400/30 to-orange-400/70">
      <Landmark size={14} strokeWidth={2.5} className="text-foreground" />
    </div>
  );
}

function WorkspaceIcon() {
  return (
    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-sm border border-primary/40 bg-gradient-to-b from-primary/20 to-primary/50">
      <Text size={14} strokeWidth={2.5} className="text-foreground" />
    </div>
  );
}

export { Icon, BloumIcon, MybucksLogo, WalletIcon, WorkspaceIcon };
