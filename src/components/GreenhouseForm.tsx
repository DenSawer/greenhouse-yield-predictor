import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sprout, Thermometer, Droplets, Sun, Calendar } from "lucide-react";

interface FormData {
  cropType: string;
  temperature: string;
  humidity: string;
  lightHours: string;
  growthDays: string;
  area: string;
}

interface GreenhouseFormProps {
  onCalculate: (data: FormData) => void;
}

export const GreenhouseForm = ({ onCalculate }: GreenhouseFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    cropType: "",
    temperature: "",
    humidity: "",
    lightHours: "",
    growthDays: "",
    area: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const isFormValid = Object.values(formData).every(value => value !== "");

  return (
    <Card className="shadow-medium hover:shadow-soft transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-primary" />
          <CardTitle>Параметры теплицы</CardTitle>
        </div>
        <CardDescription>
          Введите данные для расчета прогноза урожайности
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cropType">Тип культуры</Label>
            <Select
              value={formData.cropType}
              onValueChange={(value) => setFormData({ ...formData, cropType: value })}
            >
              <SelectTrigger id="cropType">
                <SelectValue placeholder="Выберите культуру" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomato">Томаты</SelectItem>
                <SelectItem value="cucumber">Огурцы</SelectItem>
                <SelectItem value="pepper">Перец</SelectItem>
                <SelectItem value="lettuce">Салат</SelectItem>
                <SelectItem value="strawberry">Клубника</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-primary" />
                Температура (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                placeholder="20-30"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="humidity" className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Влажность (%)
              </Label>
              <Input
                id="humidity"
                type="number"
                placeholder="60-80"
                value={formData.humidity}
                onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lightHours" className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                Освещение (ч/день)
              </Label>
              <Input
                id="lightHours"
                type="number"
                placeholder="12-16"
                value={formData.lightHours}
                onChange={(e) => setFormData({ ...formData, lightHours: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="growthDays" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Период роста (дни)
              </Label>
              <Input
                id="growthDays"
                type="number"
                placeholder="60-90"
                value={formData.growthDays}
                onChange={(e) => setFormData({ ...formData, growthDays: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Площадь теплицы (м²)</Label>
            <Input
              id="area"
              type="number"
              placeholder="100"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={!isFormValid}
          >
            Рассчитать прогноз
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
