@isTest
public class Calculator_Tests {
	@isTest
    public static void testAddition(){
        System.assertEquals(Calculator.addition(3,4), 7);
    }
    @isTest
    public static void testSubtraction(){        
        System.assertEquals(Calculator.subtraction(4,4), 0);
    }
    @isTest
    public static void testMultiply(){
        System.assertEquals(Calculator.multiply(3,4), 12);
    }
     @isTest
    public static void testMultiplyException(){
        try{
            Calculator.multiply(3,0);
        }Catch(Calculator.CalculatorException e){
            System.assertEquals('It doesn\'t make sense to multiply by zero', e.getMessage());
        }
    }
    
    @isTest
    public static void testDivideException(){
         
        try{
            Calculator.divide(3,0);
        }Catch(Calculator.CalculatorException e){
            System.assertEquals('you still can\'t divide by zero', e.getMessage());
        }
    }
    @isTest
    public static void divide_throws_exception_for_negative_number() {
        Boolean caught = true;
        try {
            Calculator.divide(-1, 2);
        } catch (Calculator.CalculatorException e) {
            System.assertEquals('Division returned a negative value.',e.getMessage());
            caught = true;
        }
        System.assert(caught, 'threw expected exception');
    }
}