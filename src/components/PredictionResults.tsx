import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Package, AlertCircle, CheckCircle2 } from "lucide-react";

interface PredictionResultsProps {
  prediction: {
    totalYield: number;
    yieldPerSquareMeter: number;
    qualityScore: number;
    recommendations: string[];
    chartData: Array<{ month: string; yield: number }>;
  };
}

export const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Общий урожай
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{prediction.totalYield} кг</div>
            <p className="text-xs opacity-90 mt-1">За сезон</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Урожайность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{prediction.yieldPerSquareMeter} кг/м²</div>
            <p className="text-xs opacity-90 mt-1">На площадь</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Качество
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{prediction.qualityScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Оценка качества</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Прогноз урожайности по месяцам</CardTitle>
          <CardDescription>
            Ожидаемая динамика урожая на основе введенных параметров
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={prediction.chartData}>
              <defs>
                <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(158 64% 52%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(158 64% 52%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="yield" 
                stroke="hsl(158 64% 52%)" 
                fillOpacity={1} 
                fill="url(#colorYield)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <CardTitle>Рекомендации</CardTitle>
          </div>
          <CardDescription>
            Советы для оптимизации урожайности
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {prediction.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
