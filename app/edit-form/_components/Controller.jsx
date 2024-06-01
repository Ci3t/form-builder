import Gradient from "@/app/_themeData/Gradient";
import Themes from "@/app/_themeData/Themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Controller({ selectedTheme }) {
  return (
    <div>
      {/* Theme selection */}
      <h2 className="my-1">Select Themes</h2>
      <Select onValueChange={(val) => selectedTheme(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, i) => (
            <SelectItem key={i + theme} value={theme.theme}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* BG Selection */}
      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {Gradient.map((bg, i) => (
          <div
            className="w-full h-[70px] rounded-lg hover:border-black hover:border-2 cursor-pointer "
            style={{ background: bg.gradient }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Controller;
