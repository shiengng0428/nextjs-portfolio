import { NavBar } from "./pages/NavBar";
import Language from "./projects/Language/Language";
import RandomPassword from "./projects/Password/RandomPassword";
import ValidatePassword from "./projects/Password/ValidatePassword";
import { ThemeToggle } from "./shadcn-components/DarkTheme";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      {/* <NavBar /> */}
      {/* <Language /> */}
      <ThemeToggle />
      <RandomPassword />
      <br />
      <ValidatePassword />
    </div>
  );
}
