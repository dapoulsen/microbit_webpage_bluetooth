import {
  createWebUSBConnection,
  createUniversalHexFlashDataSource,
  createWebBluetoothConnection,
  UARTDataEvent,
} from "@microbit/microbit-connection";

import { MicrobitBluetoothDevice, Microbit } from "microbyte";
import MyHandler from "./microbitHandler";
import hexContent from "./ml_bluetooth.hex?raw";

const microbit = new Microbit();
const microbitBluetooth = new MicrobitBluetoothDevice();
microbit.setDevice(microbitBluetooth);
const connectToDevice = () => {
  microbit.connect();
};
const handler = new MyHandler();
microbit.setHandler(handler);
microbit.setAutoReconnect(true);

const statusEl = document.getElementById("status")!;
const feedbackEl = document.getElementById("feedback")!;

async function flashMicrobit() {
  const usb = createWebUSBConnection();

  try {
    statusEl.textContent = "Connecting via USB...";
    console.log("Connecting via USB...");
    await usb.connect();
    console.log("Connected!");

    statusEl.textContent = "Flashing...";
    console.log("Flashing...");

    await usb.flash(
      createUniversalHexFlashDataSource(hexContent),
      {
        partial: true,
        progress: (p: number | undefined) => { statusEl.textContent = `Flashing: ${p ?? 0 * 100}%`; console.log(p) }
      }
    );
    console.log("Flashed!");

    statusEl.textContent = "Flash complete";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Flash failed";
  }
}

// async function connectBluetooth() {
//   try {
//     statusEl.textContent = "Connecting Bluetooth...";

//     const bluetooth = createWebBluetoothConnection();
//     await bluetooth.connect();

//     statusEl.textContent = "Connected";

//     bluetooth.addEventListener("uartdata", (event: UARTDataEvent) => {
//       const text = new TextDecoder().decode(event.value);
//       console.log("Received:", text);

//       if (text.includes("A")) {
//         feedbackEl.textContent = "Button A";
//         feedbackEl.style.color = "green";
//       } else if (text.includes("B")) {
//         feedbackEl.textContent = "Button B";
//         feedbackEl.style.color = "orange";
//       } 
//       else if (text.includes("0")) {
//         feedbackEl.textContent = "Shake";
//         feedbackEl.style.color = "purple";
//       }
//       else if (text.startsWith("Hej")) {
//         feedbackEl.textContent = "Greeting received";
//         feedbackEl.style.color = "green";
//       }
//       else {
//         feedbackEl.textContent = text;
//         feedbackEl.style.color = "blue";
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     statusEl.textContent = "Bluetooth failed";
//   }
// }

async function connectBluetooth() {
  try {
    statusEl.textContent = "Connecting Bluetooth...";
    connectToDevice();
    statusEl.textContent = "Connected";
    console.log("Connected to micro:bit via Bluetooth");
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Bluetooth failed";
  }
}

// Button events
document.getElementById("flash")!.onclick = flashMicrobit;
document.getElementById("connect")!.onclick = connectBluetooth;