import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  Leaf,
  Award,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/bagder";
import { ImageWithFallback } from "./figma/imageWithFallback";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating elements background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-100/30"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main hero banner */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <Badge
                  variant="secondary"
                  className="w-fit bg-green-100 text-green-700 border-green-200"
                >
                  🌱 100% Orgânico • Entrega no mesmo dia
                </Badge>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                variants={itemVariants}
              >
                Alimentos
                <motion.span
                  className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent block"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  frescos e saudáveis
                </motion.span>
                direto na sua mesa
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground max-w-md"
                variants={itemVariants}
              >
                Descubra nossa seleção premium de frutas, vegetais, carnes e
                laticínios. Qualidade garantida, frescor incomparável.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    Explorar produtos
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-200 hover:bg-green-50"
                  >
                    Ver ofertas
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 pt-4"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 + 1 }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    4.9 (3.2k avaliações)
                  </span>
                </div>
                <motion.div
                  className="text-sm text-muted-foreground flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Leaf className="h-4 w-4 text-green-600" />
                  +10k clientes satisfeitos
                </motion.div>
              </motion.div>
            </div>

            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fresh Vegetables and Fruits"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-2xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">100% Orgânico</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Entrega Hoje</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium">Qualidade Premium</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features bar */}
      <motion.div
        className="border-b bg-muted/30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              {
                icon: Truck,
                text: "Entrega no mesmo dia",
                color: "text-green-600",
              },
              {
                icon: Shield,
                text: "Qualidade garantida",
                color: "text-blue-600",
              },
              {
                icon: Headphones,
                text: "Suporte 24/7",
                color: "text-purple-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
