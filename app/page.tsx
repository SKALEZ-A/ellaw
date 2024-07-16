import Image from "next/image";
import Welcome from "@/app/components/subpages/home"

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between"
    >
      
      <Welcome/>
    </main>
  );
}
