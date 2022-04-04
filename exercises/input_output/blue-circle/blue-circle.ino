#define POTENTIOMETER_PIN A0

//LED_BUILTIN is pin 13
void setup() {
// put your setup code here, to run once:
    pinMode(LED_BUILTIN,OUTPUT);
    Serial.begin(9600);
}

void loop() {
// put your main code here, to run repeatedly:
    while(Serial.available()){
        char data = Serial.read();
        switch(data){
            case 'A':
                digitalWrite(LED_BUILTIN, HIGH);
                Serial.print("Case A!!!");
                //do this when A is sent from the USB-host/computer
            break;
            case 'B':
            digitalWrite(LED_BUILTIN, LOW);
                //do this when B is sent from the USB-host/computer
            break;
            case 'Q':
                //Send the current value on analogPin 0 to the USB-host/computer
                Serial.write(map(analogRead(POTENTIOMETER_PIN),0,681,0,100));
                
            break;
        }
    }
    Serial.print(map(analogRead(POTENTIOMETER_PIN),0,681,0,100));
    delay(100);
}
