const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const issues = result.error.issues || result.error.errors || [];
    const firstIssue = issues[0];

    return res.status(400).json({
      error: firstIssue?.message || "Datos inválidos",
      details: issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      })),
    });
  }

  req.body = result.data;
  next();
};

module.exports = validate;
