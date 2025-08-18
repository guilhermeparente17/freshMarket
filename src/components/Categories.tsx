import { motion } from "motion/react";
import { Apple, Beef, Milk, Wheat, Fish, Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/bagder";

interface CategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: "all", name: "Todos", count: 156, icon: null, color: "bg-gray-100" },
  { id: "fruits", name: "Frutas", count: 34, icon: Apple, color: "bg-red-100" },
  {
    id: "vegetables",
    name: "Vegetais",
    count: 28,
    icon: Wheat,
    color: "bg-green-100",
  },
  { id: "meat", name: "Carnes", count: 22, icon: Beef, color: "bg-red-100" },
  {
    id: "dairy",
    name: "Laticínios",
    count: 18,
    icon: Milk,
    color: "bg-blue-100",
  },
  {
    id: "seafood",
    name: "Peixes",
    count: 15,
    icon: Fish,
    color: "bg-cyan-100",
  },
  {
    id: "bakery",
    name: "Padaria",
    count: 39,
    icon: Cookie,
    color: "bg-yellow-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

export function Categories({
  selectedCategory,
  onCategorySelect,
}: CategoriesProps) {
  return (
    <section className="py-8 border-b bg-gradient-to-r from-green-50/50 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-lg font-medium text-green-800">Categorias</h3>
            <p className="text-sm text-muted-foreground">
              Explore nossa variedade de alimentos frescos
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onCategorySelect(category.id)}
                  className={`relative group transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                      : "hover:bg-green-50 border-green-200"
                  }`}
                >
                  {Icon && (
                    <motion.div
                      className="mr-2"
                      animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                  )}
                  {category.name}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <Badge
                      variant="secondary"
                      className={`ml-2 text-xs transition-colors duration-300 ${
                        isSelected
                          ? "bg-white/20 text-white border-white/20"
                          : "bg-green-100 text-green-700 group-hover:bg-green-200"
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </motion.div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/10 to-green-600/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isSelected ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category description */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            Todos os nossos produtos são cuidadosamente selecionados para
            garantir máxima qualidade e frescor
          </p>
        </motion.div>
      </div>
    </section>
  );
}
