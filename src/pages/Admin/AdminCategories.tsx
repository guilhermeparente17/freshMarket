import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  Package,
  TrendingUp,
  Grid3X3,
  Apple,
  Wheat,
  Beef,
  Milk,
  Fish,
  Cookie,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const iconOptions = [
  { name: "Apple", component: Apple },
  { name: "Wheat", component: Wheat },
  { name: "Beef", component: Beef },
  { name: "Milk", component: Milk },
  { name: "Fish", component: Fish },
  { name: "Cookie", component: Cookie },
  { name: "Package", component: Package },
  { name: "Tag", component: Tag },
];

const colorOptions = [
  {
    name: "Verde",
    value: "bg-green-100",
    border: "border-green-200",
    text: "text-green-700",
  },
  {
    name: "Azul",
    value: "bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    name: "Vermelho",
    value: "bg-red-100",
    border: "border-red-200",
    text: "text-red-700",
  },
  {
    name: "Amarelo",
    value: "bg-yellow-100",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  {
    name: "Roxo",
    value: "bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  {
    name: "Rosa",
    value: "bg-pink-100",
    border: "border-pink-200",
    text: "text-pink-700",
  },
  {
    name: "Ciano",
    value: "bg-cyan-100",
    border: "border-cyan-200",
    text: "text-cyan-700",
  },
  {
    name: "Laranja",
    value: "bg-orange-100",
    border: "border-orange-200",
    text: "text-orange-700",
  },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
  description: string;
};

export function AdminCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    icon: "Package",
    color: "bg-green-100",
    description: "",
  });

  //   const filteredCategories = categories.filter((category) =>
  //     category.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   const totalCategories = categories.length;
  //   const totalProducts = products.length;
  //   const mostPopularCategory = categories.reduce((prev, current) =>
  //     current.count > prev.count ? current : prev
  //   );

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.icon || !newCategory.color) return;

    // const category: Category = {
    //   id: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
    //   name: newCategory.name,
    //   icon: newCategory.icon,
    //   color: newCategory.color,
    //   count: 0,
    //   description: newCategory.description || "",
    // };

    // setCategories([...categories, category]);
    setNewCategory({
      name: "",
      icon: "Package",
      color: "bg-green-100",
      description: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category);
  };

  const handleUpdateCategory = () => {
    if (
      !editingCategory ||
      !newCategory.name ||
      !newCategory.icon ||
      !newCategory.color
    )
      return;

    // const updatedCategories = categories.map((c) =>
    //   c.id === editingCategory.id
    //     ? ({ ...editingCategory, ...newCategory } as Category)
    //     : c
    // );

    // setCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategory({
      name: "",
      icon: "Package",
      color: "bg-green-100",
      description: "",
    });
  };

  //   const handleDeleteCategory = (categoryId: string) => {
  //     setCategories(categories.filter((c) => c.id !== categoryId));
  //   };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.name === iconName);
    return iconOption ? iconOption.component : Package;
  };

  const CategoryForm = ({ isEdit = false }) => (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Categoria</Label>
        <Input
          id="name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Ex: Frutas Tropicais"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Descreva a categoria..."
          rows={3}
        />
      </div>

      {/* Preview */}
      {newCategory.name && newCategory.icon && newCategory.color && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
            <div
              className={`w-12 h-12 rounded-lg ${newCategory.color} flex items-center justify-center`}
            >
              {(() => {
                const IconComponent = getIconComponent(newCategory.icon);
                return <IconComponent className="h-6 w-6 text-slate-700" />;
              })()}
            </div>
            <div>
              <h3 className="font-medium">{newCategory.name}</h3>
              <p className="text-sm text-muted-foreground">
                {newCategory.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={isEdit ? handleUpdateCategory : handleAddCategory}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
      >
        {isEdit ? "Atualizar" : "Adicionar"} Categoria
      </Button>
    </div>
  );

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
              <h1 className="text-3xl font-bold text-slate-800">
                Gestão de Categorias
              </h1>
              <p className="text-slate-600 mt-1">
                Organize seus produtos em categorias
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Categoria
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                </DialogHeader>
                <CategoryForm />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[
            {
              title: "Total de Categorias",
              value: 0,
              icon: Grid3X3,
              color: "bg-blue-500",
              description: "Categorias ativas",
            },
            {
              title: "Produtos Catalogados",
              value: 0,
              icon: Package,
              color: "bg-green-500",
              description: "Em todas as categorias",
            },
            {
              title: "Categoria Mais Popular",
              value: "teste",
              icon: TrendingUp,
              color: "bg-purple-500",
              description: `count produtos`,
            },
          ].map((stat, index) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Categorias (0)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {/* {filteredCategories.map((category, index) => {
                    const IconComponent = getIconComponent(category.icon);
                    const colorOption = colorOptions.find(
                      (c) => c.value === category.color
                    );

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <Card className="relative group hover:shadow-lg transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div
                                className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}
                              >
                                <IconComponent className="h-6 w-6 text-slate-700" />
                              </div>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Dialog
                                  open={editingCategory?.id === category.id}
                                  onOpenChange={(open) =>
                                    !open && setEditingCategory(null)
                                  }
                                >
                                  <DialogTrigger asChild>
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                          handleEditCategory(category)
                                        }
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </motion.div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Editar Categoria
                                      </DialogTitle>
                                    </DialogHeader>
                                    <CategoryForm isEdit />
                                  </DialogContent>
                                </Dialog>

                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">
                              {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {category.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className={`${colorOption?.text || ""}`}
                              >
                                {category.count} produtos
                              </Badge>

                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Package className="h-3 w-3" />
                                <span>ID: {category.id}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })} */}
                </AnimatePresence>
              </div>

              {/* {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Nenhuma categoria encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    Tente ajustar sua busca ou adicione novas categorias.
                  </p>
                </div>
              )} */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
