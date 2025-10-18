import { useState } from "react";
import { GreenhouseForm } from "@/components/GreenhouseForm";
import { PredictionResults } from "@/components/PredictionResults";
import { Sprout, TrendingUp, Database } from "lucide-react";
import greenhouseHero from "@/assets/greenhouse-hero.jpg";

interface FormData {
  cropType: string;
  temperature: string;
  humidity: string;
  lightHours: string;
  growthDays: string;
  area: string;
}

const Index = () => {
  const [prediction, setPrediction] = useState<any>(null);

  const calculatePrediction = (data: FormData) => {
    // Mock calculation based on input parameters
    const baseYield: { [key: string]: number } = {
      tomato: 25,
      cucumber: 30,
      pepper: 20,
      lettuce: 15,
      strawberry: 18,
    };

    const area = parseFloat(data.area);
    const temp = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);
    const lightHours = parseFloat(data.lightHours);
    
    // Calculate yield based on optimal conditions
    let yieldFactor = 1.0;
    if (temp >= 20 && temp <= 28) yieldFactor *= 1.2;
    if (humidity >= 60 && humidity <= 80) yieldFactor *= 1.15;
    if (lightHours >= 12 && lightHours <= 16) yieldFactor *= 1.1;
    
    const yieldPerSqm = (baseYield[data.cropType] || 20) * yieldFactor;
    const totalYield = Math.round(yieldPerSqm * area);
    const qualityScore = Math.min(95, Math.round(yieldFactor * 80));

    // Generate chart data
    const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];
    const chartData = months.map((month, index) => ({
      month,
      yield: Math.round(totalYield * (0.1 + index * 0.15)),
    }));

    // Generate recommendations
    const recommendations = [];
    if (temp < 20) recommendations.push("Увеличьте температуру до 20-28°C для оптимального роста");
    if (humidity < 60) recommendations.push("Повысьте влажность до 60-80% для лучшего развития растений");
    if (lightHours < 12) recommendations.push("Обеспечьте не менее 12 часов освещения в день");
    if (recommendations.length === 0) {
      recommendations.push("Условия оптимальны! Продолжайте поддерживать текущие параметры");
      recommendations.push("Регулярно проверяйте состояние растений и качество почвы");
      recommendations.push("Следите за вентиляцией для предотвращения болезней");
    }

    setPrediction({
      totalYield,
      yieldPerSquareMeter: Math.round(yieldPerSqm * 10) / 10,
      qualityScore,
      recommendations,
      chartData,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <img 
          src={greenhouseHero} 
          alt="Modern greenhouse with lush plants" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center text-primary-foreground">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Sprout className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Прогноз урожайности теплицы
            </h1>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              Используйте данные для точного расчета ожидаемого урожая и получайте рекомендации по оптимизации
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Точный анализ</h3>
            <p className="text-sm text-muted-foreground">
              Расчеты на основе научных данных и агротехнических параметров
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Прогнозирование</h3>
            <p className="text-sm text-muted-foreground">
              Визуализация динамики урожая на предстоящие месяцы
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Рекомендации</h3>
            <p className="text-sm text-muted-foreground">
              Персональные советы для улучшения условий выращивания
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <GreenhouseForm onCalculate={calculatePrediction} />
          </div>
          <div>
            {prediction ? (
              <PredictionResults prediction={prediction} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 rounded-xl bg-muted/30">
                  <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Заполните форму слева для получения прогноза урожайности
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Прогноз урожайности теплицы. Все данные носят информационный характер.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
