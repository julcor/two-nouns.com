int LED = 5;
void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}
void loop() {
  int cmd = Serial.parseInt();
  Serial.println(cmd);
  if(cmd == 1){
    digitalWrite(LED, HIGH);   
  }else if (cmd == -1){
    digitalWrite(LED, LOW);   
  }
}
