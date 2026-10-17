  // Color inputs
  const backgroundColor = document.getElementById("backgroundColor")
  const surfaceColor = document.getElementById("surfaceColor")
  const accentColor = document.getElementById("accentColor")
  const textColor = document.getElementById("textColor")
  
  // Typography controls
  const fontFamily = document.getElementById("fontFamily")
  const fontSize = document.getElementById("fontSize")
  const fontSizeValue = document.getElementById("fontSizeValue")
  const fontWeight = document.getElementById("fontWeight")
  
  // Spacing controls
  const cardRadius = document.getElementById("cardRadius")
  const radiusValue = document.getElementById("radiusValue")
  const cardPadding = document.getElementById("cardPadding")
  const paddingValue = document.getElementById("paddingValue")
  
  // Preview elements
  const previewStage = document.getElementById("previewStage")
  const demoCard = document.getElementById("demoCard")
  const demoTitle = document.getElementById("demoTitle")
  const demoDescription = document.getElementById("demoDescription")
  const demoButton = document.getElementById("demoButton")
  
  // CSS output
  const cssOutput = document.getElementById("cssOutput")
  const lineCount = document.getElementById("lineCount")
  
  // Buttons
  const resetButton = document.getElementById("resetButton")
  const exportButton = document.getElementById("exportButton")
  const copyButton = document.getElementById("copyButton")
  
  // Navigation and settings panels
  const navItems = document.querySelectorAll(".nav-item")
  const settingsGroups = document.querySelectorAll("[data-settings]")
  
  // Color palette presets
  const paletteOptions = document.querySelectorAll(".palette-option")
  
  // Preview viewport controls
  const viewportButtons = document.querySelectorAll(".viewport-button")
  
  function updateBg(txtValue,pre) {
    const txtInit = txtValue.value.trim()
    
    if(!txtInit || !CSS.supports("color", txtInit)) return;
    const swatch = txtValue.closest(".color-field").querySelector(".color-swatch")
    
    pre.style.backgroundColor = txtInit
    swatch.style.backgroundColor = txtInit
  }
  
  backgroundColor.addEventListener("input",() => updateBg(backgroundColor,previewStage))
  
  surfaceColor.addEventListener("input",() => updateBg(surfaceColor,demoCard))
