public class ArraySum {
	public static Integer arraySum(List<Integer> numbers){
    //code here
   	 Integer sum = 0;
    	for(Integer i = 0;i<numbers.size();i++){
       	 sum+=numbers[i];
   		}
    return sum;
	}
}