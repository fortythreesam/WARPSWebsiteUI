export interface Boardgame {
    title: string;
    game_id: number;
    min_player_count: number;
    max_player_count: number;
    min_time: number;
    max_time: number;
    complexity: number;
    thumbnail: string;
}
