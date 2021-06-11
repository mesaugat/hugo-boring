// Masonry Layout
function enableMasonry() {
    window.onload = resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);
    var imgs = document.getElementsByTagName('img');
    for (let img of imgs) {
        imgLoad(img, resizeAllGridItems())
    }
}

function imgLoad(img, callback) {
    var timer = setInterval(function () {
        if (img.complete) {
            resizeAllGridItems()
            clearInterval(timer)
        }
    }, 50)
}

function resizeGridItem(item) {
    grid = document.getElementsByClassName("masonry")[0];
    rowHeight = 0;
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.grid-content').getBoundingClientRect().height) / rowGap);
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    allItems = document.getElementsByClassName("item");
    for (x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}

function resizeInstance(instance) {
    item = instance.elements[0];
    resizeGridItem(item);
}

//color components/schema
function getcolorscheme() {
    let storageColorScheme = localStorage.getItem("lightDarkMode")
    let element = document.getElementById('lightDarkMode');
    let targetDiv = document.getElementById('lightDarkOptions');
    let targets = targetDiv.getElementsByTagName('span');
    let screen = document.getElementById('is-open');

    element.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })

    for (let target of targets) {
        target.addEventListener('click', () => {
            let targetName = target.getAttribute("name")
            let icon = switchMode(targetName)
            let old_icon = element.firstElementChild.getAttribute("data-icon")
            element.firstElementChild.setAttribute("data-icon", icon)
            element.firstElementChild.classList.remove('fa-' + old_icon)
            element.firstElementChild.classList.add('fa-' + icon)

            localStorage.setItem("lightDarkMode", targetName)

            targetDiv.classList.toggle('hidden')
            screen.classList.toggle('hidden')
        })
    }
    screen.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })

}

{{/*  Utterances  */}}
{{/*  Deprecation warning(v1.0.0) starts */}}
{{- $commentHandler := .Site.Params.comment.handler | default .Site.Params.comment.platform }}
{{/*  Deprecation warning(v1.0.0) ends  */}}
{{ $enableUtterances := and (eq $commentHandler "utterances") (eq .Site.Params.comment.utterances.theme "eureka") }}
{{- if $enableUtterances }}
function switchUtterancesTheme(theme) {
    const message = {
        type: 'set-theme',
        theme: theme,
      };
    const utterances = document.querySelector('iframe').contentWindow; // try event.source instead
    utterances.postMessage(message, 'https://utteranc.es');
}
{{- end }}

function switchMode(mode) {
    let icon = ''
    switch (mode) {
        case 'Light':
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', switchDarkMode)
            icon = 'sun'
            document.getElementsByTagName('html')[0].classList.remove('dark')
            {{/*  Utterances  */}}
            {{- if $enableUtterances }}
            switchUtterancesTheme('github-light')
            {{- end }}
            break
        case 'Dark':
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', switchDarkMode)
            icon = 'moon'
            document.getElementsByTagName('html')[0].classList.add('dark')
            {{/*  Utterances  */}}
            {{- if $enableUtterances }}
            switchUtterancesTheme('github-dark')
            {{- end }}
            break
        case 'Auto':
            icon = 'adjust'
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
            switchDarkMode(isDarkMode)
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', switchDarkMode)
            break
    }
    return icon
}

function switchDarkMode(e) {
    if (e.matches) {
        document.getElementsByTagName('html')[0].classList.add('dark')
        {{/*  Utterances  */}}
        {{- if $enableUtterances }}
        switchUtterancesTheme('github-dark')
        {{- end }}
    } else {
        document.getElementsByTagName('html')[0].classList.remove('dark')
        {{/*  Utterances  */}}
        {{- if $enableUtterances }}
        switchUtterancesTheme('github-light')
        {{- end }}
    }
}

//switch burger
function switchBurger() {
    let element = document.getElementById('navbar-btn');
    let screen = document.getElementById('is-open-mobile');
    let target = document.getElementById('target');
    element.addEventListener('click', () => {
        target.classList.toggle('hidden');
        screen.classList.toggle('hidden')
    })
    screen.addEventListener('click', () => {
        target.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })
}

//switch language
function switchLanguage() {
    let element = document.getElementById('languageMode');
    let targetDiv = document.getElementById('languageOptions');
    let targets = targetDiv.getElementsByTagName('a')
    let screen = document.getElementById('is-open-lang');

    element.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden');
        screen.classList.toggle('hidden')
    })

    for (let target of targets) {
        target.addEventListener('click', () => {
            targetDiv.classList.toggle('hidden')
            screen.classList.toggle('hidden')
        })
    }
    screen.addEventListener('click', () => {
        targetDiv.classList.toggle('hidden')
        screen.classList.toggle('hidden')
    })
}
