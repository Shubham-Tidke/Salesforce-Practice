public class getLargestNumber {
	public static Integer findLargest(List<Integer> nums) {
	   	Integer max = nums[0];
    	for(Integer i = 1 ; i < nums.size() ; i++){
        if(max < nums[i] )
            max = nums[i];
    	}
    	return max;
	}
}