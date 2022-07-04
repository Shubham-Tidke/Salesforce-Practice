public class EvenNumbers {
	public List<Integer> evenNumbers(Integer n) {
    	//code here
    	List<Integer> num = new List<Integer>();
    	for(Integer i = 1 ; i <= n ; i++)
       	 num.add(i*2);
    	return num;
	}
}