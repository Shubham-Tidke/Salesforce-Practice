public class Calculator {
  public class CalculatorException extends Exception{}
  
  public static Integer addition(Integer a, Integer b){
    return a + b;
  }

  public static Integer subtraction(Integer a, Integer b){
    return a - b;
  }

  public static Integer multiply(Integer a, Integer b){
    if(b==0 || a==0){
      throw new CalculatorException('It doesn\'t make sense to multiply by zero');
    }
    return a * b;
  }

  public static Decimal divide(Integer numerator, Integer denominator){
    if(denominator == 0){
      throw new CalculatorException('you still can\'t divide by zero');
    }
    Decimal returnValue = numerator / denominator;
    if(returnValue < 0){
      throw new CalculatorException('Division returned a negative value.' + returnValue);
    }
    return returnValue;
  }

  
}