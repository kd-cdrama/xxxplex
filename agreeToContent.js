const prevOnLoad = window.onload

function getAgreementCookie() {
    const name = "agreed=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {

        var c = ca[i]

        while (c.charAt(0) == ' ') c = c.substring(1) 

        if (c.indexOf(name) == 0) {
            /* return c.substring(name.length, c.length) */
            return true;
        }
    }
    return false;
}

function fadeOutOverlay( opacity ) {
  const newOpacity = opacity - 0.05;
  const overlay = document.getElementById('overlay')
  if(opacity <= 0) {
    document.body.removeChild(overlay)
    return
  }
  overlay.style.opacity = newOpacity
  setTimeout(function() {fadeOutOverlay(newOpacity)}, 10)
}

function continueYes() {
  document.cookie = 'agreed=true;'
  console.log('document.cookie = ', document.cookie)
  fadeOutOverlay(1);
}

function continueNo() {
  document.cookie = 'agreed=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  window.location = 'https://promujer.org/'
}

function getAgreement() {

  if(getAgreementCookie()) {
    console.log('document has been agreed to already');
    if(prevOnLoad) prevOnLoad()
    return;
  }
  const agreementMessage = [
    '<img src="http://static1.squarespace.com/static/566913cb0e4c11de025472ae/t/57be9d0515d5db8e88288c2b/1515813659457/?format=1500w" ',
    ' style="width:90%;max-width:160px"/><br /> <br />',
    '<span style="font-family: proxima-novai, \'Arial\', sans-serif;font-weight: 700; letter-spacing: 4.02px;line-height: 2.47em;"> ',
    'EPISTLE &amp; EPIPHANY </span><br />',
    '<p style="font-family: \'raleway\', \'Arial\', sans-serif; font-size: 18px;font-weight: 400;font-style: normal;letter-spacing: 0px;line-height: .9em;">',
    'An intimate collection <br /> ',
    'of birth poems,<br />',
    'love letters &amp; photographs',
    '</p><br />',
    '<img src="https://static1.squarespace.com/static/566913cb0e4c11de025472ae/t/5808fa4e1b631b83fe97fc20/1476983790330/Shell+Luttrell+Midwife+Cover?format=1000w"',
    'style="width:90%; max-width:400px"/>',
    '<br /><br />',
    '<strong style="color:red;font-size:1.2em;">WARNING!</strong>',
    '<br /><br />',
    'This site contains uncensored photos of human child birth.',
    '<br /><br />',
    'Would you like to continue?<br /><br />',
    '<span style="color:grey;font-size:0.8em;">By clicking yes, you also agree to this site\'s use of cookies.</span>'
  ].join('')

  const overlayDiv = document.createElement('div')
  overlayDiv.id = 'overlay'
  overlayDiv.className = 'overlay'
  overlayDiv.style.paddingBottom= '20px'
  overlayDiv.style.position = 'fixed' 
  overlayDiv.style.width = '100%' 
  overlayDiv.style.minHeight = '100%'
  overlayDiv.style.top = 0 
  overlayDiv.style.left = 0
  overlayDiv.style.right = 0
  overlayDiv.style.bottom = 0
  overlayDiv.style.backgroundColor = 'rgba(0,0,0,0.5)'
  overlayDiv.style.zIndex = 2
  overlayDiv.style.cursor = 'pointer' 
  overlayDiv.style.textAlign = 'center'
  overlayDiv.style.overflowY = 'scroll'

  const agreementMessageBox = document.createElement('div')
  agreementMessageBox.id = 'agreementmessage'
  agreementMessageBox.className = 'agreementmessage'
  agreementMessageBox.style.width = '90%'
  /* agreementMessageBox.style.height = '90%' */
  agreementMessageBox.style.marginBottom = '10px'
  agreementMessageBox.style.backgroundColor = 'rgba(255,255,255,1)'
  agreementMessageBox.style.padding = '25px'
  agreementMessageBox.style.margin = 'auto'
  agreementMessageBox.style.border = '1px solid black'
  agreementMessageBox.style.borderRadius = '5px'
  agreementMessageBox.style.boxShadow = '3px 5px'
  agreementMessageBox.style.fontFamily = '"Arial", sans-serif'
  const btnStyle = 'padding: 10px;border-radius: 4px;margin: 10px;box-shadow: 2px 2px;min-width:100px;'
  agreementMessageBox.innerHTML = [ '<p>', agreementMessage, '</p>',
                                    ' <button style="', btnStyle, '" onclick="continueYes()">YES</button>',
                                    ' <button style="'+btnStyle+'"onclick="continueNo()">NO</button>'].join('')

  overlayDiv.appendChild(agreementMessageBox)

  const bod = document.body
  bod.appendChild(overlayDiv)

  if(prevOnLoad) prevOnLoad()
}

window.onload = getAgreement
