(function() {
	    const settings = {
	        minEnergy: 25,
	        minInterval: 50,
	        maxInterval: 200,
	        minEnergyRefillDelay: 60000,
	        maxEnergyRefillDelay: 180000,
	        maxRetries: 5
	    };
	    let retryCount = 0;
	
	    function getElementPosition(element) {
	        let current_element = element;
	        let top = 0,
	            left = 0;
	        do {
	            top += current_element.offsetTop || 0;
	            left += current_element.offsetLeft || 0;
	            current_element = current_element.offsetParent;
	        } while (current_element);
	        return {
	            top,
	            left
	        };
	    }
	
	    function getRandomNumber(min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    }
	
	    function performRandomClick() {
	        const energyElement = document.getElementsByClassName("user-tap-energy")[0];
	        const buttonElement = document.getElementsByClassName('user-tap-button')[0];
	        if (!energyElement || !buttonElement) {
	            console.log("%c[Hamster Kombat Auto-Click]", "background: #483d8b; color: #fff; padding: 5px;");
	            console.log("%cElement not found, retrying...", "background: #483d8b; color: #fff; padding: 5px;");
	            retryCount++;
	            if (retryCount >= settings.maxRetries) {
	                console.log("%cMax retries reached, reloading page...", "background: #483d8b; color: #fff; padding: 5px;");
	                location.reload();
	            } else {
	                setTimeout(() => {
	                    setTimeout(performRandomClick, getRandomNumber(settings.minInterval, settings.maxInterval));
	                }, 2000);
	            }
	            return;
	        }
	        retryCount = 0;
	        const energy = parseInt(energyElement.getElementsByTagName("p")[0].textContent.split(" / ")[0]);
	        if (energy > settings.minEnergy) {
	            let {
	                top,
	                left
	            } = getElementPosition(buttonElement);
	            const randomX = Math.floor(left + Math.random() * buttonElement.offsetWidth);
	            const randomY = Math.floor(top + Math.random() * buttonElement.offsetHeight);
	            const pointerDownEvent = new PointerEvent('pointerdown', {
	                clientX: randomX,
	                clientY: randomY
	            });
	            const pointerUpEvent = new PointerEvent('pointerup', {
	                clientX: randomX,
	                clientY: randomY
	            });
	            buttonElement.dispatchEvent(pointerDownEvent);
	            buttonElement.dispatchEvent(pointerUpEvent);
	        } else {
	            console.log("%c[Hamster Kombat Auto-Click]", "background: #483d8b; color: #fff; padding: 5px;");
	            console.log("%cInsufficient energy, pausing script for energy refill.", "background: #483d8b; color: #fff; padding: 5px;");
	            const randomEnergyRefillDelay = getRandomNumber(settings.minEnergyRefillDelay, settings.maxEnergyRefillDelay);
	            const delayInSeconds = randomEnergyRefillDelay / 1000;
	            console.log(`%cEnergy refill delay set to: ${delayInSeconds} seconds.`, "background: #483d8b; color: #fff; padding: 5px;");
	            setTimeout(performRandomClick, randomEnergyRefillDelay);
	            return;
	        }
	        const randomInterval = getRandomNumber(settings.minInterval, settings.maxInterval);
	        setTimeout(performRandomClick, randomInterval);
	    }
	
	    function clickThankYouBybitButton() {
	        const thankYouButton = document.querySelector('.bottom-sheet-button.button.button-primary.button-large');
	        if (thankYouButton) {
	            thankYouButton.click();
	            console.log("%c[Hamster Kombat Auto-Click]", "background: #483d8b; color: #fff; padding: 5px;");
	            console.log("%c'Thank you' button clicked.", "background: #483d8b; color: #fff; padding: 5px;");
	        }
	    }
	    setTimeout(() => {
	        console.log("%c[Hamster Kombat Auto-Click]", "background: #483d8b; color: #fff; padding: 5px;");
	        console.log("%cScript starting after 5 seconds delay...", "background: #483d8b; color: #fff; padding: 5px;");
	        clickThankYouBybitButton();
	        performRandomClick();
	    }, 5000);
	})();
