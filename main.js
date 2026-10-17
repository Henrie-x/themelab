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
  
  const palette = {
    violet: {
      background: "#11151d",
      surface: "#1a202b",
      accent: "#9a8cff",
      text: "#f1f3f8"
    },
    ocean: {
      background: "#0b1620",
      surface: "#142736",
      accent: "#38bdf8",
      text: "#eaf7ff"
    },
    emerald: {
      background: "#0c1714",
      surface: "#142820",
      accent: "#34d399",
      text: "#e8fff3"
    },
    rose: {
      background: "#1b1118",
      surface: "#2a1924",
      accent: "#fb7185",
      text: "#fff0f4"
    }
  }
  
  function updateColor(input, variableName, element, shouldGenerate = true) {
    const colorInit = input.value.trim()
    
    if(!colorInit || !CSS.supports("color", colorInit)) return;
    
    document.documentElement.style.setProperty(variableName,colorInit)
    
    element.style.backgroundColor = colorInit
    
    if(shouldGenerate) {
      generateCss()
    }
  }
  
  backgroundColor.addEventListener("input",() => {
    const swatch = backgroundColor.closest(".color-field").querySelector(".color-swatch")
    
    updateColor(backgroundColor,"--preview-bg",swatch)
  })
  
  surfaceColor.addEventListener("input",() => {
    const swatch = surfaceColor.closest(".color-field").querySelector(".color-swatch")
    
    updateColor(surfaceColor,"--surface",swatch)
  })
  
  accentColor.addEventListener("input",() => {
    const swatch = accentColor.closest(".color-field").querySelector(".color-swatch")
    
    updateColor(accentColor,"--accent",swatch)
  })
  
  textColor.addEventListener("input",() => {
    const swatch = textColor.closest(".color-field").querySelector(".color-swatch")
    
    updateColor(textColor,"--text",swatch)
  })
  
  navItems.forEach(item => {
    item.addEventListener("click",() => {
      navItems.forEach(i => i.classList.remove("active"))
      item.classList.add("active")
      
      const itemPanel = item.dataset.panel
      
      settingsGroups.forEach(section => {
        const secPan = section.dataset.settings
        
        if(secPan === itemPanel) {
          section.classList.remove("hidden")
        }else {
          section.classList.add("hidden")
        }
      })
    })
  })
  
  paletteOptions.forEach(pal => {
    pal.addEventListener("click", () => {
      paletteOptions.forEach(p => p.classList.remove("selected"))
      pal.classList.add("selected")
  
      const selectedPalette = pal.dataset.palette
      const colors = palette[selectedPalette]
  
      if (!colors) return
  
      backgroundColor.value = colors.background
      surfaceColor.value = colors.surface
      accentColor.value = colors.accent
      textColor.value = colors.text
  
      const backgroundSwatch = backgroundColor.closest(".color-field").querySelector(".color-swatch")
      const surfaceSwatch = surfaceColor.closest(".color-field").querySelector(".color-swatch")
      const accentSwatch = accentColor.closest(".color-field").querySelector(".color-swatch")
      const textSwatch = textColor.closest(".color-field").querySelector(".color-swatch")
  
      updateColor(backgroundColor, "--preview-bg", backgroundSwatch, false)
      updateColor(surfaceColor, "--surface", surfaceSwatch, false)
      updateColor(accentColor, "--accent", accentSwatch, false)
      updateColor(textColor, "--text", textSwatch, false)
  
      generateCss()
    })
  })
  
  fontFamily.addEventListener("change",() => {
    const fontValue = fontFamily.value
    
    document.documentElement.style.setProperty("--font", fontValue)
    generateCss()
  })
  
  fontSize.addEventListener("input",() => {
    const fontValue = fontSize.value
    document.documentElement.style.setProperty("--font-size", `${fontValue}px`)
    fontSizeValue.textContent = `${fontValue}px`
    
    const scale = fontValue / 12;
    document.documentElement.style.setProperty("--scale",scale)
    generateCss()
  })
  
  fontWeight.addEventListener("change",() => {
    const fontValue = fontWeight.value
    document.documentElement.style.setProperty("--font-weight", fontValue)
    generateCss()
  })
  
  cardRadius.addEventListener("input",() => {
    const cardValue = cardRadius.value
    document.documentElement.style.setProperty("--card-radius", `${cardValue}px`)
    radiusValue.textContent =  `${cardValue}px`
    generateCss()
  })
  
  cardPadding.addEventListener("input",() => {
    const cardValue = cardPadding.value
    document.documentElement.style.setProperty("--card-padding", `${cardValue}px`)
    paddingValue.textContent =  `${cardValue}px`
    generateCss()
  })
  
  function generateCss() {
    let computedSty = getComputedStyle(document.documentElement)
    
    const bg = computedSty.getPropertyValue("--preview-bg").trim()
    const surface = computedSty.getPropertyValue("--surface").trim()
    const accent = computedSty.getPropertyValue("--accent").trim()
    const text = computedSty.getPropertyValue("--text").trim()
    const font = computedSty.getPropertyValue("--font").trim()
    const size = computedSty.getPropertyValue("--font-size").trim()
    const weight = computedSty.getPropertyValue("--font-weight").trim()
    const radius = computedSty.getPropertyValue("--card-radius").trim()
    const pad = computedSty.getPropertyValue("--card-padding").trim()
    
    cssOutput.textContent = `
      :root {
        --preview-bg: ${bg};
        --surface: ${surface};
        --accent: ${accent};
        --text: ${text};
        --font: ${font};
        --font-weight: ${weight};
        --font-size: ${size};
        --card-radius: ${radius};
        --card-padding: ${pad};
      }
    `
    
    const lines = cssOutput.textContent.split("\n").length
    
    lineCount.textContent = lines
  }
  
  generateCss()
  
  copyButton.addEventListener("click",async () => {
    try {
      await navigator.clipboard.writeText(cssOutput.textContent)
      
      copyButton.textContent = "copied ✓"
      
      setTimeout(() => {
        copyButton.textContent = "copy"
      },1500)
    } catch (e) {
      console.log(e)
    }
  })
  
  exportButton.addEventListener("click",() => {
    const cssFile = new Blob(
      [cssOutput.textContent],
      {
        type: "text/css"
      }
    )
    
    const cssUrl = URL.createObjectURL(cssFile)
    const link = document.createElement("a")
    
    link.href = cssUrl
    link.download = "theme.css"
    link.click()
    URL.revokeObjectURL(cssUrl)
  })
  
  const defaultSettings = {
    background: "#11151d",
    surface: "#1a202b",
    accent: "#9a8cff",
    text: "#f1f3f8",
    font: '"DM Sans", sans-serif',
    fontSize: 12,
    fontWeight: 400,
    cardRadius: 16,
    cardPadding: 24
  }
  
  resetButton.addEventListener("click",() => {
    backgroundColor.value = defaultSettings.background
    surfaceColor.value = defaultSettings.surface
    accentColor.value = defaultSettings.accent
    textColor.value = defaultSettings.text
    fontFamily.value = defaultSettings.font
    fontSize.value = defaultSettings.fontSize
    fontWeight.value = defaultSettings.fontWeight
    cardRadius.value = defaultSettings.cardRadius
    cardPadding.value = defaultSettings.cardPadding
    
    document.documentElement.style.setProperty("--preview-bg", defaultSettings.background)
    document.documentElement.style.setProperty("--surface", defaultSettings.surface)
    document.documentElement.style.setProperty("--accent", defaultSettings.accent)
    document.documentElement.style.setProperty("--text", defaultSettings.text)
    
    document.documentElement.style.setProperty("--font", defaultSettings.font)
    document.documentElement.style.setProperty("--font-size", `${defaultSettings.fontSize}px`)
    document.documentElement.style.setProperty("--font-weight", defaultSettings.fontWeight)
    
    document.documentElement.style.setProperty("--card-radius", `${defaultSettings.cardRadius}px`)
    document.documentElement.style.setProperty("--card-padding", `${defaultSettings.cardPadding}px`)
    document.documentElement.style.setProperty("--scale", 1)
    
    paletteOptions.forEach(p => p.classList.remove("selected"))

    document.querySelector('[data-palette="violet"]')?.classList.add("selected")
    
    fontSizeValue.textContent = `${defaultSettings.fontSize}px`
    radiusValue.textContent = `${defaultSettings.cardRadius}px`
    paddingValue.textContent = `${defaultSettings.cardPadding}px`
    
    const backgroundSwatch = backgroundColor.closest(".color-field").querySelector(".color-swatch")
    const surfaceSwatch = surfaceColor.closest(".color-field").querySelector(".color-swatch")
    const accentSwatch = accentColor.closest(".color-field").querySelector(".color-swatch")
    const textSwatch = textColor.closest(".color-field").querySelector(".color-swatch")
    
    backgroundSwatch.style.backgroundColor = defaultSettings.background
    surfaceSwatch.style.backgroundColor = defaultSettings.surface
    accentSwatch.style.backgroundColor = defaultSettings.accent
    textSwatch.style.backgroundColor = defaultSettings.text
    
    generateCss()
  })