import sqlite3, pathlib

def build():
    con = sqlite3.connect(":memory:")
    con.executescript("""
    create table policies (policy_id text primary key, product text, annual_premium real, renewed integer);
    create table claims   (claim_id text primary key, policy_id text, paid_amount real);
    insert into policies values
      ('P1','AUTO',1000,1),('P2','AUTO',1200,0),('P3','AUTO',800,1),('P4','HOME',2000,1),('P5','HOME',1500,0);
    insert into claims values
      ('C1','P1',300),('C2','P1',200),('C3','P2',600),('C4','P4',1000);
    """)
    return con

def run():
    raw = pathlib.Path(__file__).with_name("renewal_analytics.sql").read_text()
    sql = "\n".join(l for l in raw.splitlines() if not l.strip().startswith("--"))
    q1, q2 = [s for s in sql.split(";") if "select" in s.lower()]
    con = build()
    return con.execute(q1).fetchall(), con.execute(q2).fetchall()

if __name__ == "__main__":
    r, l = run()
    print(r); print(l)
