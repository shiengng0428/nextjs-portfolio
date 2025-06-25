// import { NavBar } from "./pages/NavBar";
import Uuid from "./projects/Uuid/Uuid";
import { ThemeToggle } from "./shadcn-components/DarkTheme";
// import Language from "./projects/Language/Language";
// import Translate from "./projects/Translate/Translate";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      {/* <NavBar /> */}
      <ThemeToggle />
      {/* <Language /> */}
      {/* <Translate /> */}
      <br />
      <Uuid />
    </div>
  );
}
