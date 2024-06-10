import BorderStyle from "@/app/_themeData/BorderStyle";
import Gradient from "@/app/_themeData/Gradient";
import Themes from "@/app/_themeData/Themes";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function Controller({
  selectedTheme,
  selectedBg,
  selectedBorder,
  selectedBorder2,
  setSignInEnable,
}) {
  const [showMore, setShowMore] = useState(6);

  return (
    <div>
      {/* Theme selection */}
      <h2 className="my-1 ">Select Themes</h2>

      <Select onValueChange={(val) => selectedTheme(val)}>
        <SelectTrigger className="w-full text-purple-700">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, i) => (
            <SelectItem key={i + theme} value={theme.theme}>
              <div className="flex gap-3 text-purple-700">
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
                {theme.theme == null ? "None" : theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* BG Selection */}
      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {Gradient.map(
          (bg, i) =>
            i < showMore && (
              <div
                key={i + bg.name}
                className="w-full h-[70px] rounded-lg hover:border-black hover:border-2 cursor-pointer flex justify-center items-center border-2 border-violet-300"
                style={{
                  background: bg.gradient,
                }}
                onClick={() => selectedBg(bg.gradient)}
              >
                {i == 0 && "None"}
              </div>
            )
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full my-1"
        onClick={() => setShowMore(showMore > 6 ? 6 : Gradient.length)}
      >
        {showMore > 6 ? "Less" : "More"}
      </Button>

      {/*! Borders */}

      <div>
        <label>Border Style</label>
        <div className="grid grid-cols-3 gap-3">
          {BorderStyle.map((border, i) => (
            <div
              key={i + border.name}
              className="flex justify-center items-center flex-col "
            >
              <div
                className="cursor-pointer hover:border-2 rounded-lg  w-[70px] h-[70px]  flex justify-center items-center "
                style={{
                  boxShadow: border?.key == border?.key && border?.value,
                  border: border?.name == border?.name && border?.value,
                }}
                onClick={() => selectedBorder(border)}
              >
                {i == 0 && "None"}
              </div>
              <h2 className="">{border.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 my-4 items-center mt-10">
        <Checkbox onCheckedChange={(e) => setSignInEnable(e)} />{" "}
        <h2>Enable Social Authentication before submitting </h2>
      </div>
    </div>
  );
}

export default Controller;
