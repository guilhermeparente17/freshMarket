import { motion } from "motion/react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Award,
} from "lucide-react";

import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "../../components/ui/bagder";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const salesData = [
  { month: "Jan", vendas: 15420, pedidos: 245 },
  { month: "Fev", vendas: 18230, pedidos: 298 },
  { month: "Mar", vendas: 21800, pedidos: 341 },
  { month: "Abr", vendas: 19650, pedidos: 315 },
  { month: "Mai", vendas: 24100, pedidos: 389 },
  { month: "Jun", vendas: 27300, pedidos: 425 },
];

const categoryData = [
  { name: "Frutas", vendas: 8500, cor: "#22c55e" },
  { name: "Vegetais", vendas: 6200, cor: "#16a34a" },
  { name: "Carnes", vendas: 5800, cor: "#ef4444" },
  { name: "Laticínios", vendas: 4200, cor: "#3b82f6" },
  { name: "Peixes", vendas: 2800, cor: "#06b6d4" },
];

const recentOrders = [
  {
    id: "#2341",
    customer: "Maria Silva",
    total: 89.5,
    status: "completed",
    time: "5 min atrás",
  },
  {
    id: "#2342",
    customer: "João Santos",
    total: 156.8,
    status: "processing",
    time: "12 min atrás",
  },
  {
    id: "#2343",
    customer: "Ana Costa",
    total: 73.2,
    status: "pending",
    time: "25 min atrás",
  },
  {
    id: "#2344",
    customer: "Pedro Lima",
    total: 198.9,
    status: "completed",
    time: "1h atrás",
  },
];

export function AdminDashboard() {
  const stats = [
    {
      title: "Vendas Hoje",
      value: "R$ 1.234",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Pedidos",
      value: "89",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Produtos",
      value: 0,
      change: "+3",
      isPositive: true,
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Clientes",
      value: "1.2k",
      change: "+5.4%",
      isPositive: true,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "processing":
        return "Processando";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Bem-vindo ao painel administrativo do FreshMarket
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Hoje
              </Badge>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                Meta: 85%
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.title}
                      </p>
                      <motion.p
                        className="text-2xl font-bold mt-1"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center mt-2">
                        {stat.isPositive ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          vs. ontem
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <motion.div variants={itemVariants}>
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Vendas dos Últimos 6 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient
                        id="colorVendas"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22c55e"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22c55e"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "vendas" ? `R$ ${value}` : value,
                        name === "vendas" ? "Vendas" : "Pedidos",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="vendas"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorVendas)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Chart */}
          <motion.div variants={itemVariants}>
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Vendas por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="vendas"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Orders and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600">
                          R$ {order.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.time}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Meta Mensal</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Satisfação do Cliente</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Produtos em Estoque</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">4.8</p>
                      <p className="text-xs text-muted-foreground">
                        Avaliação Média
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">2.3k</p>
                      <p className="text-xs text-muted-foreground">Reviews</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
