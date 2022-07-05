public class getPositiveNumbers {
	public List<Integer> positiveIntegers(List<Integer> numbers) {
       	List<Integer>positive = new List<Integer>();
   	 	for(Integer i = 0 ; i < numbers.size() ; i++){
        if(numbers[i] > 0 )
            positive.add(numbers[i]);
        }
    	return positive;
	}
}