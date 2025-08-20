import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Heart,
  Leaf,
  Settings,
  LogOut,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/bagder";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

interface HeaderProps {
  cartItemsCount: number;
}

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Header({ cartItemsCount }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { id: "/", label: "Início" },
    { id: "products", label: "Produtos" },
    { id: "cart", label: "Carrinho" },
  ];

  const adminNavItems = [
    { id: "admin/dashboard", label: "Dashboard" },
    { id: "admin/products", label: "Produtos" },
    { id: "admin/categories", label: "Categorias" },
    { id: "admin/reports", label: "Relatórios" },
  ];

  const isAdminPage = user?.type === "admin";

  const handleLogout = () => {
    logout();
    toast.error("Você saiu da sua conta.");
    navigate("/");
    return;
  };

  const isLoggedIn = user !== null;

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b bg-background/65 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isAdminPage ? "bg-slate-50/95" : ""
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="w-4 h-4 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              {isAdminPage ? "FreshMarket Admin" : "FreshMarket"}
            </h1>
          </motion.div>

          {/* Search bar - hidden on mobile and admin pages */}
          {!isAdminPage && (
            <motion.div
              className="hidden md:flex flex-1 max-w-md mx-8"
              variants={itemVariants}
            >
              <div className="relative w-full">
                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar alimentos frescos..."
                    className="pl-9 bg-input-background border-0 focus:ring-2 focus:ring-green-500/20"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            {!isAdminPage && (
              <>
                {/* Search icon for mobile */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Search className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Wishlist */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Cart */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => navigate("/cart")}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-green-500 to-green-600"
                        >
                          {cartItemsCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </>
            )}

            {/* Admin toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  navigate(isAdminPage ? "/admin/dashboard" : "/loginAdmin")
                }
                className={isAdminPage ? "bg-slate-200" : ""}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                {isLoggedIn ? (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      <Package className="mr-2 h-4 w-4" />
                      Meus Pedidos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      <Search className="mr-2 h-4 w-4" />
                      Rastrear Pedidos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      <User className="mr-2 h-4 w-4" />
                      Entrar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/register")}>
                      <User className="mr-2 h-4 w-4" />
                      Cadastrar-se
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.nav
          className="hidden md:flex h-12 items-center space-x-6 text-sm"
          variants={itemVariants}
        >
          {(isAdminPage ? adminNavItems : navItems).map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`transition-colors hover:text-green-600 relative`}
              //   ${
              //     currentPage === item.id ? "text-green-600" : ""
              //   }
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 origin-left"
                initial={{ scaleX: 0 }}
                // animate={{ scaleX: currentPage === item.id ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
}
