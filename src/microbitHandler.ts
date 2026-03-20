import type { MBSpecs } from "microbyte";
import type { MicrobitHandler } from "microbyte/dist/interfaces/MicrobitHandler"



class MyHandler implements MicrobitHandler {
    public onMessageReceived = (data: string) => {
        console.log(`Received message: ${data}`);
    };
    public onInitializing = () => {
        console.log('micro:bit is initializing');
    };
    public onConnected = (versionNumber?: MBSpecs.MBVersion) => {
        console.log(`A microbit v${versionNumber} has connected`);
    } 

    public onAccelerometerDataReceived = (x: number, y: number, z: number) => {
        //do nothing as i dont want this
        // console.log(`Accelerometer reads (${x}, ${y}, ${z})`);
        
    };

    public onButtonAPressed = (state: MBSpecs.ButtonState) => {
        console.log(`Button A changed state to ${state}`);
    };

    public onButtonBPressed = (state: MBSpecs.ButtonState) => {
        console.log(`Button B changed state to ${state}`);
    };

    public onUartMessageReceived = (data: string) => {
        console.log(`Received UART message: ${data}`);
    };

    public onDisconnected = () => {
        console.log('micro:bit was disconnected');
    };

    public onReconnecting = () => {
        console.log('Attempting to reconnect micro:bit');
    };

    public onReconnected = () => {
        console.log('micro:bit was reconnected');
    };

    public onConnectError = (error: Error) => {
        console.log('Microbit failed to connect', error);
    };

    public onReconnectError = (error: Error) => {
        console.log('Microbit failed to reconnect', error);
    };

    public onClosed = () => {
        console.log('Goodbye!');
    };

    public onConnecting = () => {
        console.log("Attempting to connect micro:bit");
    };

    public onClosedError = (error: Error) => {
        console.log("micro:bit failed to close gracefully", error);
    };
}

export default MyHandler;