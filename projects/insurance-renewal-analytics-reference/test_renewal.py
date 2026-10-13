from run_demo import run
r, l = run()
# AUTO: 3 expiring, 2 renewed -> 0.667 ; HOME: 2 expiring, 1 renewed -> 0.5
assert r == [("AUTO", 3, 2, 0.667), ("HOME", 2, 1, 0.5)], r
# AUTO premium 3000, paid 1100 -> 0.367 ; HOME premium 3500, paid 1000 -> 0.286
assert l == [("AUTO", 3000.0, 1100.0, 0.367), ("HOME", 3500.0, 1000.0, 0.286)], l
print("renewal analytics tests passed")
