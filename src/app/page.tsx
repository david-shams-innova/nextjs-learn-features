// import Image from "next/image";
import AnimateWebp from "@/components/animate-webp";
import BoxAnimationLines from "./components/box-animation-lines/box-animation-lines";
import CompoundInterestCalculator from "./components/stocks/compound-interest";
import PageLayout from "@/components/nice-webs/layouts/header-main-footer-rainbow";
import PageLayoutResponsive from "@/components/nice-webs/layouts/header-main-footer-rainbow-responsive";

export default function Home() {
  return (
    <>
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <main className="flex min-h-screen flex-col justify-between" style={{ border: "solid 1px lightblue" }}>
        {/* <BoxAnimationLines /> */}
        {/* <AnimateWebp /> */}
        {/* <CompoundInterestCalculator /> */}
        {/* <PageLayout /> */}
        <PageLayoutResponsive />
      </main>
    </>
  );
}
