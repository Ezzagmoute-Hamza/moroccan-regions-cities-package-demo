
import { useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from './Header'
import {
    getAllRegions,
    getRegionCities,
    getAssignedMorrocanCities,
    getUnassignedCities,
    countMoroccanRegions,
    countAllMoroccanCities,
    countAssignedCities,
    countRegionCities,
    countUnassignedCities
} from 'moroccan-regions-cities';

import {languages,internationalization} from '@/constants';
import { Card, CardContent } from "@/components/ui/card";
import { Language } from './Header';
export default function Home() {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || languages.english
  );

  const [selectedRegion, setSelectedRegion] = useState<string>(getAllRegions(language)[0].regionId);
  const [selectedCity, setSelectedCity] = useState("")
  const statistics = useMemo(()=>{
      return [
        {
            title:internationalization[language]?.statistics.totalRegions,
            value:countMoroccanRegions()
        },
        {
            title:internationalization[language]?.statistics.totalCities,
            value:countAllMoroccanCities()
        },
        {
            title:internationalization[language]?.statistics.totalAssignedCities,
            value:countAssignedCities()
        },
        {
            title:internationalization[language]?.statistics.totalUnassignedCitites,
            value:countUnassignedCities()
        },
        {
            title:internationalization[language]?.statistics.slectedRegionCities,
            value:countRegionCities(selectedRegion)
        }
      ]
  },[selectedRegion,language]);

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
  }

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header selectedLanguage={language} setLanguage={setLanguage}/>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{internationalization[language]?.statistics.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statistics.map((statistic:{title:string,value:number},index:number) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{statistic.value}</p>
                <p className="text-lg text-gray-600 capitalize">{statistic.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">{internationalization[language]?.selectBoxes.regions.label}</h2>
            <Select onValueChange={handleRegionChange}>
              <SelectTrigger id="region-select" className="w-full">
                <SelectValue placeholder={internationalization[language]?.selectBoxes?.regions.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {getAllRegions(language).map((region:{regionId:string,regionName:string},index:number) => (
                  <SelectItem key={index} value={region.regionId}>{region.regionName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">{internationalization[language]?.selectBoxes?.cities.regionCities.label}</h2>
            <Select onValueChange={handleCityChange} value={selectedCity}>
              <SelectTrigger id="city-select" className="w-full">
                <SelectValue placeholder={internationalization[language]?.selectBoxes?.cities?.regionCities.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {getRegionCities(selectedRegion,language).map((city:string,index:number) => (
                  <SelectItem key={index} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2"> {internationalization[language]?.selectBoxes?.cities?.unAssignedCities.label}</h2>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={internationalization[language]?.selectBoxes?.cities?.unAssignedCities.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {getUnassignedCities(language).map((city:string,index:number) => (
                  <SelectItem key={index} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">{internationalization[language]?.selectBoxes?.cities?.assignedCities.label} </h2>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={internationalization[language]?.selectBoxes?.cities?.assignedCities.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {getAssignedMorrocanCities(language).map((city:string,index:number) => (
                  <SelectItem key={index} value={city}>
                    <div className="flex justify-between w-full">
                      <span>{city}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}