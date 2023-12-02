**1. Look at the example below:**
![399d6250639c028553eb30f494eabe07.png](../_resources/399d6250639c028553eb30f494eabe07.png)
*a. When a word appear more frequently than others, is that word show more relationship than the other? Explain why*
Example ans: 
No, because word frequency alone doesn't necessarily indicate the strength of a word's relationship to the overall theme or meaning of a play. For example:
* Common words like "good" may appear frequently but may not carry specific thematic importance.
* Distinctive words that have significantly higher frequencies in one play compared to others may be more indicative of the play's themes or content.

*b. Which of the word "good" or "fool" is closer meaning to "battle"?*
Ans:
$$cos(good, battle)=\frac{114+62.7+89.13}{\sqrt{114^2+80^2+62^2+89^2}\sqrt{1^2+7^2+13^2}}=0.24$$
$$cos(fool, battle)=\frac{36+7+4.13}{\sqrt{36^2+58^2+1+4^2}\sqrt{1^2+7^2+13^2}}=0.09$$
Therefore, "good" and "battle" are closer similarity
\\
**2. From the formula of PMI, explain:**
*a. Why very rare words tend to have very high PMI values?*
Ans: (đại loại là $w$ thấp, dẫn dễn $P(w)P(c)$ cũng bé theo, mà mẫu bé thì giá trị của phân số rất lớn, mà log mà 1 hàm tăng dẫn đến giá trị PMI tăng)
*b. How does corpus size impact PMI values?*
Ans:  In a smaller corpus, there may be fewer instances of co-occurrences, leading to less reliable probability estimates. This can result in higher variability in PMI values, making it more susceptible to noise. On the other hand, a larger corpus provides more data for estimating probabilities, potentially yielding more stable and accurate PMI values. 
