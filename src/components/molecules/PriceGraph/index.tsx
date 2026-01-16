import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Info, Sparkles } from "lucide-react";
import type { FlightOffer } from "../../../interfaces";
import { usePriceStats } from "../../../hooks/usePriceStats";
import { formatCurrency, formatCompactCurrency } from "../../../utils/formatUtils";
import {
  GraphContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  Title,
  Subtitle,
  TrendIndicator,
  StatItem,
  StatLabel,
  StatValue,
  BadgesRow,
  InfoBadge,
  ChartWrapper,
  DealsFooter,
  EmptyState,
} from "./styles";

interface PriceGraphProps {
  flightOffers: FlightOffer[];
  onFlightClick?: (flightId: string) => void;
}

// Custom dot component for clickable points
const CustomDot = (props: any) => {
  const { cx, cy, payload, onClick } = props;

  if (!cx || !cy) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill="#0fb5ae"
      stroke="#ffffff"
      strokeWidth={2}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick && payload?.flightIds?.[0]) {
          onClick(payload.flightIds[0]);
        }
      }}
    />
  );
};

const PriceGraph = ({ flightOffers, onFlightClick }: PriceGraphProps) => {
  const { stats, trend, dealsInfo, data } = usePriceStats(flightOffers);

  if (flightOffers.length === 0) {
    return (
      <GraphContainer>
        <EmptyState>No flight data available for chart</EmptyState>
      </GraphContainer>
    );
  }

  return (
    <GraphContainer>
      <Header>
        <HeaderLeft>
          <Title>Price Trends</Title>
          <Subtitle>
            Price distribution across flight options (updates as you filter)
          </Subtitle>
          <TrendIndicator $isUp={trend.isUp}>
            {trend.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            Trending {trend.isUp ? "up" : "down"} {trend.percentage.toFixed(1)}%
          </TrendIndicator>
        </HeaderLeft>
        <HeaderRight>
          <StatItem>
            <StatLabel>Lowest</StatLabel>
            <StatValue $variant="success">
              {formatCurrency(stats.lowest, stats.currency)}
            </StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Average</StatLabel>
            <StatValue $variant="default">
              {formatCurrency(stats.average, stats.currency)}
            </StatValue>
          </StatItem>
        </HeaderRight>
      </Header>

      <BadgesRow>
        <InfoBadge>
          <Info size={14} />
          Prices are trending {trend.isUp ? "up" : "down"} by{" "}
          {trend.percentage.toFixed(1)}%
        </InfoBadge>
        <InfoBadge>
          <Info size={14} />
          {dealsInfo.greatDeals} great deals available
        </InfoBadge>
        <InfoBadge>
          <Info size={14} />
          Save up to {formatCurrency(dealsInfo.maxSavings, stats.currency)} vs
          average price
        </InfoBadge>
      </BadgesRow>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0fb5ae" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0fb5ae" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="priceRange"
              stroke="var(--text)"
              tick={{ fontSize: 13, fill: "var(--text)", fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)", strokeWidth: 1 }}
            />
            <YAxis
              stroke="var(--text)"
              tick={{ fontSize: 13, fill: "var(--text)", fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCompactCurrency(value, stats.currency)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background-card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text)",
              }}
              formatter={(value) => [
                formatCurrency(typeof value === 'number' ? value : 0, stats.currency),
                "Avg Price",
              ]}
              labelFormatter={(label) => `Range: ${label}`}
            />
            <ReferenceLine
              y={stats.average}
              stroke="#d97706"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "Avg",
                position: "right",
                fill: "#d97706",
                fontSize: 13,
                fontWeight: 600,
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#0fb5ae"
              strokeWidth={3}
              fill="url(#priceGradient)"
              dot={(props) => <CustomDot {...props} onClick={onFlightClick} />}
              activeDot={{
                r: 9,
                fill: "#0fb5ae",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <DealsFooter>
        <Sparkles size={16} />
        {dealsInfo.dealCount} great deals available below average price
      </DealsFooter>
    </GraphContainer>
  );
};

export { PriceGraph };

