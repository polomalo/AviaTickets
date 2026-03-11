export const dividerAfterSx = {
    content: "''",
    position: "absolute",
    backgroundColor: "#DFE5EC",
    left: { xs: "50%", sm: "auto" },
    bottom: 0,
    width: { xs: "80%", sm: "1px" },
    height: { xs: "1px", sm: "80%" },
    right: { xs: "auto", sm: 0 },
    top: { xs: "auto", sm: "50%" },
    transform: {
        xs: "translateX(-50%)",
        sm: "translateY(-50%)",
    },
};

export const inputBaseSx = {
    textAlign: "center",
    fontSize: "16px",
    width: "100%",
    height: "100%",
    padding: "0 12px",
    boxSizing: "border-box",
    color: "#4A4A4A",
    border: "none",
    outline: "none",
    caretColor: "#4A4A4A",
    fontWeight: 600,
    letterSpacing: "0.5px",
};

export const outlinedRootSx = {
    height: "100%",
    minHeight: "unset",
    alignItems: "stretch",
    padding: 0,
    backgroundColor: "#fff",
    borderRadius: 0,
};

export const noOutlineSx = {
    border: "none",
};

export const sectionSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    mb: { xs: 4, sm: "50px" },
    height: { xs: "auto", sm: 50 },
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1.5, sm: 0 },
};

export const formSx = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    height: { xs: "auto", sm: "100%" },
};
