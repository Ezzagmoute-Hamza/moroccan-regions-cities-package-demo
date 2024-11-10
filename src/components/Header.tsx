import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { internationalization, languages } from "@/constants";

export type Language = "english" | "french" | "arabic";

type HeaderProps = {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
}

const Header = ({ selectedLanguage, setLanguage }:HeaderProps) => {
  
    const handleChangeLanguage = (value: Language) => {
        setLanguage(value);
        localStorage.setItem("language", value);
        if (value === languages.arabic) {
          document.documentElement.setAttribute("dir", "rtl");
        } else {
          document.documentElement.setAttribute("dir", "ltr");
        }
      };

  return (
    <header className="bg-white shadow rounded-lg mb-8 p-4 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-xl md:text-2xl text-center md:text-start mb-3 md:mb-0 font-bold text-gray-800">
        {internationalization[selectedLanguage]?.header?.title}
      </h1>
      
      <div className="flex items-center space-x-2">
        <Globe className="h-5 w-5 text-gray-500" />
        
        <Select 
          onValueChange={(value: Language) => handleChangeLanguage(value)} 
          value={selectedLanguage}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          
          <SelectContent>
            {Object.values(languages).map((language) => (
              <SelectItem key={language} value={language}>
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
          
        </Select>
      </div>
    </header>
  );
};

export default Header;
