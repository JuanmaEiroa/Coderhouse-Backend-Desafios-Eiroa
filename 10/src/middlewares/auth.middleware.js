export function isAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

export function isGuest(req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/products");
  }
}

//FUNCION PARA VALIDACION DE ENDPOINTS
export function isAdmin(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "Admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Acceso no permitido. Se requiere ser Admin" });
  }
}

export function isPremium(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "Premium") {
    next();
  } else {
    res
    .status(403)
    .json({ message: "Acceso no permitido. Se requiere ser Premium" });
  }
}

export function isUser(req, res, next) {
  const { user } = req.session;
  if (user && user.role === "User") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Acceso no permitido. Se requiere ser User" });
  }
}

export function isPremiumOrAdmin (req,res,next) {
  const {user} = req.session;
  if (user.role === "Premium" || user.role === "Admin") {
    next()
  } else {
    res.status(403).json({message: "Acceso no permitido. Se requiere ser Premium o Admin"})
  }
}

export function isUserOrPremium (req,res,next) {
  const {user} = req.session;
  if (user.role === "User" || user.role === "Premium") {
    next()
  } else {
    res.status(403).json({message: "Acceso no permitido. Se requiere ser User o Premium"})
  }
}