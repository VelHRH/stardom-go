interface User {
 id: number;
 full_name: string;
 email: string;
}

interface Match {
 match: string;
 show: string;
 rating: number;
 year: number;
}

interface GrandPrix {
 wrestler1: string;
 wrestler2: string;
 rating: number;
 year: number;
}

interface FormData {
 match: string;
 show: string;
 year: number;
 rating: number;
}
