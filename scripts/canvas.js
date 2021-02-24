let noise = window.noise;
let canvas = document.getElementById('visualizer');
let ctx = canvas.getContext('2d');

let image = ctx.createImageData(canvas.width, canvas.height);
let data = image.data;

let noiseSize = document.getElementById('noise-size').value;
generateNoise();

let ctrlPanelData = document.getElementById('ctrl-form');
ctrlPanelData.addEventListener('submit', onSubmit, false);

function onSubmit(e)
{
    e.preventDefault();
    noiseSize = e.target[0].value;
    generateNoise();
}

function generateNoise()
{
    let start = Date.now();

    noise.seed(Math.random());

    for(let x = 0; x < canvas.width; x++)
    {
        for(let y = 0; y < canvas.height; y++)
        {
            // Noise functions return values between -1 and 1

            let value = noise.simplex2(x / noiseSize, y / noiseSize);
            value *= 256;

            let cell = (x + y * canvas.width) * 4;
            data[cell] = data[cell + 1] = data[cell + 2] = value;
            // data[cell] += Math.max(0, (25 - value) * 8); // rgb
            data[cell + 3] = 255; // alpha
        }
    }

    ctx.fillColor = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(image, 0, 0);

    let end = Date.now();
    let caption = document.getElementById('caption');

    console.log('Rendered in ' + (end - start) + ' ms');
    caption.textContent = (`Rendered in ${end - start} ms`);
}