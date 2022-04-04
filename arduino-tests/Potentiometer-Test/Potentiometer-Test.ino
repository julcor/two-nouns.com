#define POTENTIOMETER_PIN A0

void setup() 
{
  Serial.begin(9600);
}
void loop()
{
  Serial.println(analogRead(POTENTIOMETER_PIN));
  delay(100);
}
