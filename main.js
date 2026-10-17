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
  // Main container
  const recentList = document.getElementById("recentList");
  
  // Empty state
  const recentEmpty = document.getElementById("recentEmpty");
  
  
  const recentItems = document.querySelectorAll(".recent-item");
  const recentNames = document.querySelectorAll(".recent-card-heading h4");
  const recentSwatches = document.querySelectorAll(".recent-swatches");
  const openButtons = document.querySelectorAll(".recent-open");
  const moreButtons = document.querySelectorAll(".recent-more");
  //const saveStyleButton = document.getElementById("saveStyleButton");
  
  const saveModal = document.getElementById("saveModal");
  const styleName = document.getElementById("styleName");
  const saveStyleForm = document.getElementById("saveStyleForm");
  const cancelSave = document.getElementById("cancelSave");
  const saveStyleButton = document.getElementById("saveStyleButton");
  const saveChangesButton = document.getElementById("saveChangesButton");
  
  const key = "theme"
  let editingId = null;
  
  let themelab = JSON.parse(localStorage.getItem(key)) || [];
  
  function saveThemeLab() {
    localStorage.setItem(key, JSON.stringify(themelab))
  }
  
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
  
  function getCurrentSettings() {
    const settings = {
      id: crypto.randomUUID(),
      background: backgroundColor.value,
      surface: surfaceColor.value,
      accent: accentColor.value,
      text: textColor.value,
      font: fontFamily.value,
      fontSize: Number(fontSize.value),
      fontWeight: fontWeight.value,
      cardRadius: Number(cardRadius.value),
      cardPadding: Number(cardPadding.value),
      createdAt: Date.now()
    };
    
    return settings;
  }
  
  function loadThemeSettings(style) {
    backgroundColor.value = style.background;
      surfaceColor.value = style.surface;
      accentColor.value = style.accent;
      textColor.value = style.text;
    
      fontFamily.value = style.font;
      fontSize.value = style.fontSize;
      fontWeight.value = style.fontWeight;
      cardRadius.value = style.cardRadius;
      cardPadding.value = style.cardPadding;
      
      document.documentElement.style.setProperty("--surface",style.surface)
      document.documentElement.style.setProperty("--accent",style.accent)
      document.documentElement.style.setProperty("--text",style.text)
      document.documentElement.style.setProperty("--preview-bg",style.background)
      document.documentElement.style.setProperty("--font",style.font)
      document.documentElement.style.setProperty("--font-size",`${style.fontSize}px`)
      document.documentElement.style.setProperty("--font-weight",style.fontWeight)
      document.documentElement.style.setProperty("--card-radius",`${style.cardRadius}px`)
      document.documentElement.style.setProperty("--card-padding",`${style.cardPadding}px`)
      document.documentElement.style.setProperty("--scale",style.fontSize / 12)
      
      fontSizeValue.textContent = `${style.fontSize}px`;
      radiusValue.textContent = `${style.cardRadius}px`;
      paddingValue.textContent = `${style.cardPadding}px`;
      
      backgroundColor.closest(".color-field").querySelector(".color-swatch").style.backgroundColor = style.background;
      surfaceColor.closest(".color-field").querySelector(".color-swatch").style.backgroundColor = style.surface;
      accentColor.closest(".color-field").querySelector(".color-swatch").style.backgroundColor = style.accent;
      textColor.closest(".color-field").querySelector(".color-swatch").style.backgroundColor = style.text;
      
      generateCss()
  }
  
  saveStyleButton.addEventListener("click",() => {
    saveModal.classList.remove("hidden")
  })
  
  function renderStyles() {
    recentList.innerHTML = ""
    if(!themelab) return
    
    if(themelab.length === 0) {
      recentEmpty.classList.remove("hidden")
    }else {
      recentEmpty.classList.add("hidden")
      
      recentList.innerHTML = themelab.map(s => {
      return (
        `
          <li class="recent-item" data-id="${s.id}">
    
          <div class="recent-card-preview">
            <div class="recent-card-top">
              <span class="recent-card-logo">◈</span>
              <span class="recent-card-label">PREVIEW</span>
            </div>
    
            <div class="recent-card-content">
              <span class="recent-card-line"></span>
              <span class="recent-card-line short"></span>
    
              <div class="recent-card-button"></div>
            </div>
    
            <div class="recent-swatches">
              <span style="background: ${s.background};"></span>
              <span style="background: ${s.surface};"></span>
              <span style="background: ${s.accent};"></span>
              <span style="background: ${s.text};"></span>
            </div>
          </div>
    
          <div class="recent-card-info">
    
            <div class="recent-card-heading">
              <h4>${s.name}</h4>
              <span class="recent-status-dot" style="background: ${s.accent};"></span>
            </div>
    
            <p class="recent-card-date">Saved just now</p>
    
            <div class="recent-card-actions">
              <button
                class="recent-open"
                type="button"
                data-action="open"
              >
                Open style <span>↗</span>
              </button>
              
              <button class="recent-edit" type="button" data-action="edit">Edit</button>
    
              <button
                class="recent-delete"
                type="button"
                aria-label="Delete ${s.name}"
                data-action="delete"
              >
                ×
              </button>
            </div>
    
          </div>
    
        </li>
        `
      )
    }).join("")
    }
    
  }
  
  cancelSave.addEventListener("click",() => {
    saveModal.classList.add("hidden");
    editingId = null;
    styleName.value = "";
  })
  
  saveStyleForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputValue = styleName.value.trim();
    if (!inputValue) return;
  
    if (editingId) {
      themelab = themelab.map((theme) => {
        if (theme.id === editingId) {
          return {
            ...theme,
            name: inputValue
          };
        }
  
        return theme;
      });
  
      saveThemeLab();
      renderStyles();
    } else {
      const settings = getCurrentSettings();
      settings.name = inputValue;
  
      themelab.push(settings);
      saveThemeLab();
      renderStyles();
    }
  
    saveModal.classList.add("hidden");
    styleName.value = "";
  });
  
  
  recentList.addEventListener("click",(e) => {
    
    const btn = e.target.closest("button")
    if(!btn) return;
    
    const li = btn.closest("li")
    if(!li) return;
    
    const id = li.dataset.id
    if(!id) return;
    
    if(btn.classList.contains("recent-open")) {
      const findId = themelab.find(i => i.id === id)
      
      if(!findId) return;
      loadThemeSettings(findId);
    }
    
    if(btn.classList.contains("recent-delete")) {
      themelab = themelab.filter(i => i.id !== id)
      saveThemeLab()
      renderStyles()
    }
    
    if(btn.classList.contains("recent-edit")) {
      const style = themelab.find(item => item.id === id);
      if (!style) return;
      
      editingId = style.id;
      saveChangesButton.classList.remove("hidden");
      loadThemeSettings(style)
      styleName.value = style.name;
      saveModal.classList.remove("hidden")
    }
  })
  
  function updateThemeName(editingId,newSettings) {
    if (!editingId || !newSettings.name.trim()) return;
    
      themelab = themelab.map(theme => {
        if(theme.id === editingId) {
          return {
            ...theme,
            ...newSettings,
            id: editingId,
            name: newSettings.name.trim()
          }
        }else {
          return theme
        }
      })
    
    saveThemeLab()
    renderStyles()
  }
  
  
  saveChangesButton.addEventListener("click", () => {
    if (!editingId) return;
    
    const existingStyle = themelab.find(
      theme => theme.id === editingId
    );
    
    if (!existingStyle) return;
    
    const settings = getCurrentSettings();
    
    settings.id = editingId;
    settings.name = existingStyle.name;
    
    updateThemeName(editingId, settings);
    editingId = null;
    saveChangesButton.classList.add("hidden");
  });
  
  renderStyles()
