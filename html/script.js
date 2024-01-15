document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('clock-canvas');
    const ctx = canvas.getContext('2d');
    const toggleButton = document.getElementById('toggleButton');
    const timeLabel = document.getElementById('time-label');

    let bgColor = 'black';
    let fgColor = 'white';

    toggleButton.addEventListener('click', function () {
        [bgColor, fgColor] = [fgColor, bgColor];
        document.body.style.backgroundColor = bgColor;
        toggleButton.style.backgroundColor = bgColor;
        toggleButton.style.color = fgColor;
	// Change button text based on the foreground color
        toggleButton.textContent = capitalizeFirstLetter(bgColor);
	// Update #time-label color dynamically
        timeLabel.style.color = fgColor;  
	canvas.style.border = "5px solid "+ fgColor; 
    });

    // Simulate a click on the button when the HTML is loaded
    toggleButton.click();

    function drawClock() {
        const now = new Date();
        const hour = now.getHours() % 12;
        const minute = now.getMinutes();
        const second = now.getSeconds();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw clock face
        ctx.beginPath();
        ctx.arc(200, 200, 190, 0, 2 * Math.PI);
        ctx.strokeStyle = fgColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw hour numbers
        // (Similar logic to your Python code for drawing hour numbers)

	for (let i = 0; i < 12; i++) {
    		const angle = i * (Math.PI / 6) - Math.PI / 2;
    		const x = 200 + 0.85 * 190 * Math.cos(angle);
    		const y = 200 + 0.85 * 190 * Math.sin(angle);

    		ctx.font = 'bold 35px Tahoma';
    		ctx.fillStyle = fgColor;
    		ctx.textAlign = 'center';

    		if (i === 0) {
        		ctx.fillText((i + 12).toString(), x, y + 5);
    		} else {
        		ctx.fillText(i.toString(), x, y+10);
    		}
}

        // Draw minute lines
        // (Similar logic to your Python code for drawing minute lines)
	for (let i = 0; i < 60; i++) {
    		const angle = i * (Math.PI / 30) - Math.PI / 2;
    		const x1 = 200 + 0.52 * 190 * Math.cos(angle);
    		const y1 = 200 + 0.52 * 190 * Math.sin(angle);
    		const x2 = 200 + 0.7 * 190 * Math.cos(angle);
    		const y2 = 200 + 0.7 * 190 * Math.sin(angle);

    		ctx.beginPath();
    		if (i % 5 === 0) {
        		ctx.lineWidth = 3;
    		} else {
        		ctx.lineWidth = 1;
    		}
    		ctx.moveTo(x1, y1);
    		ctx.lineTo(x2, y2);
    		ctx.strokeStyle = fgColor;
    		ctx.stroke();
	}


        // Draw clock hands
        // (Similar logic to your Python code for drawing clock hands)
	const hourAngle = (hour + minute / 60) * (Math.PI / 6) - Math.PI / 2;
	const hourX = 200 + 0.52 * 190 * Math.cos(hourAngle);
	const hourY = 200 + 0.52 * 190 * Math.sin(hourAngle);

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(hourX, hourY);
	ctx.strokeStyle = fgColor;
	ctx.lineWidth = 6;
	ctx.stroke();

	// Draw minute hand
	const minuteAngle = (minute + second / 60) * (Math.PI / 30) - Math.PI / 2;
	const minuteX = 200 + 0.7 * 190 * Math.cos(minuteAngle);
	const minuteY = 200 + 0.7 * 190 * Math.sin(minuteAngle);

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(minuteX, minuteY);
	ctx.strokeStyle = fgColor;
	ctx.lineWidth = 4;
	ctx.stroke();

	// Draw second hand
	const secondAngle = second * (Math.PI / 30) - Math.PI / 2;
	const secondX = 200 + 0.6 * 190 * Math.cos(secondAngle);
	const secondY = 200 + 0.6 * 190 * Math.sin(secondAngle);

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(secondX, secondY);
	ctx.strokeStyle = 'red'; // Adjust color as needed
	ctx.lineWidth = 2;
	ctx.stroke();


        requestAnimationFrame(drawClock);
    }

    drawClock();
});

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

